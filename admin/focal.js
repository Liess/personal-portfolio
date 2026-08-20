(function () {
  var h = window.h;
  var createClass = window.createClass;
  var CMS = window.CMS;
  var media = window.CMSMedia || {
    hasMedia: function (value) {
      return Boolean(value);
    },
    remember: function () {},
    resolve: function (getAsset, value) {
      if (!getAsset || value == null) return "";
      try {
        var asset = getAsset(value);
        return asset && (asset.url || asset.toString()) || String(value);
      } catch (err) {
        return String(value || "");
      }
    },
  };

  function parsePair(value) {
    var raw = value;
    if (raw && typeof raw.get === "function") {
      raw = raw.get("x") != null ? raw.get("x") + " " + raw.get("y") : "";
    }
    var text = String(raw == null || raw === "" ? "50 50" : raw).trim();
    var parts = text.split(/[\s,]+/);
    var x = Number(parts[0]);
    var y = Number(parts[1]);
    if (isNaN(x)) x = 50;
    if (isNaN(y)) y = 50;
    return {
      x: Math.min(100, Math.max(0, Math.round(x))),
      y: Math.min(100, Math.max(0, Math.round(y))),
    };
  }

  function unwrap(value) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    if (typeof value.get === "function" && value.get("image")) return unwrap(value.get("image"));
    return String(value);
  }

  function fieldPath(props) {
    var field = props.field;
    var names = [];
    if (field && field.get && field.get("media_field")) {
      names.push(field.get("media_field"));
    } else {
      names.push("image");
    }
    var entry = props.entry;
    if (!entry) return "";
    for (var i = 0; i < names.length; i += 1) {
      var value = entry.getIn(["data", names[i]]);
      if (value == null) value = entry.get(names[i]);
      value = unwrap(value);
      if (media.hasMedia(value)) return value;
    }
    return "";
  }

  function neighborPath(start) {
    if (!start) return "";
    var node = start;
    while (node && node !== document.body) {
      var sib = node.previousElementSibling;
      while (sib) {
        if (sib.querySelector && sib.querySelector(".focal-frame")) {
          sib = sib.previousElementSibling;
          continue;
        }
        var imgs = sib.querySelectorAll ? sib.querySelectorAll("img") : [];
        for (var i = imgs.length - 1; i >= 0; i -= 1) {
          var src = imgs[i].getAttribute("src") || imgs[i].currentSrc || imgs[i].src || "";
          if (!src || src.indexOf("empty.svg") !== -1) continue;
          if (src.indexOf("blob:") === 0 || src.indexOf("data:") === 0) {
            var label = (sib.textContent || "").match(/[\w.-]+\.(jpe?g|png|gif|webp|avif)/i);
            media.remember(label ? label[0] : src, src);
            return src;
          }
          if (/assets\/blog|raw\.githubusercontent|\.(jpe?g|png|gif|webp|avif)(\?|$)/i.test(src)) {
            return src;
          }
        }
        var text = sib.textContent || "";
        var match = text.match(/[\w.-]+\.(jpe?g|png|gif|webp|avif)/i);
        if (match) return match[0];
        sib = sib.previousElementSibling;
      }
      node = node.parentElement;
    }
    return "";
  }

  var FocalControl = createClass({
    getInitialState: function () {
      return { src: "", dragging: false };
    },
    componentDidMount: function () {
      var self = this;
      this.syncPhoto();
      this._timer = setInterval(function () {
        self.syncPhoto();
      }, 300);
      window.addEventListener("mouseup", this.stopDrag);
      window.addEventListener("mousemove", this.moveDrag);
    },
    componentWillUnmount: function () {
      clearInterval(this._timer);
      window.removeEventListener("mouseup", this.stopDrag);
      window.removeEventListener("mousemove", this.moveDrag);
    },
    syncPhoto: function () {
      var path = fieldPath(this.props) || neighborPath(this._root);
      var src = media.resolve(this.props.getAsset, path, this.props.field, this.props.entry);
      if (src && src !== this.state.src) this.setState({ src: src });
    },
    setPair: function (x, y) {
      x = Math.min(100, Math.max(0, Math.round(x)));
      y = Math.min(100, Math.max(0, Math.round(y)));
      this.props.onChange(x + " " + y);
    },
    pointFromEvent: function (event) {
      if (!this._frame) return null;
      var rect = this._frame.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      return {
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      };
    },
    startDrag: function (event) {
      event.preventDefault();
      var point = this.pointFromEvent(event);
      if (!point) return;
      this.setState({ dragging: true });
      this.setPair(point.x, point.y);
    },
    moveDrag: function (event) {
      if (!this.state.dragging) return;
      var point = this.pointFromEvent(event);
      if (!point) return;
      this.setPair(point.x, point.y);
    },
    stopDrag: function () {
      if (this.state.dragging) this.setState({ dragging: false });
    },
    render: function () {
      var pair = parsePair(this.props.value);
      var src = this.state.src;
      var self = this;
      return h("div", {
        id: this.props.forID,
        className: this.props.classNameWrapper,
        ref: function (el) {
          self._root = el;
        },
      },
        h("div", {
          className: "focal-frame",
          ref: function (el) {
            self._frame = el;
          },
          onMouseDown: this.startDrag,
          style: {
            position: "relative",
            width: "100%",
            height: "220px",
            overflow: "hidden",
            borderRadius: "12px",
            background: "#1a2330",
            cursor: src ? "grab" : "default",
            border: "1px solid rgba(0,0,0,0.12)",
            userSelect: "none",
          },
        },
          src
            ? h("img", {
              src: src,
              alt: "",
              draggable: false,
              style: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: pair.x + "% " + pair.y + "%",
                display: "block",
                pointerEvents: "none",
              },
            })
            : h("p", {
              style: { margin: 0, padding: "16px", color: "#9aabc0", fontSize: "13px" },
            }, "Add a photo in the image field above, then drag this frame to crop."),
          src
            ? h("span", {
              style: {
                position: "absolute",
                left: pair.x + "%",
                top: pair.y + "%",
                width: "14px",
                height: "14px",
                margin: "-7px 0 0 -7px",
                borderRadius: "50%",
                border: "2px solid #fff",
                background: "#8eb6d9",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.35)",
                pointerEvents: "none",
              },
            })
            : null
        ),
        h("p", {
          style: { margin: "8px 0 0", fontSize: "12px", color: "#6e7f94" },
        }, "Drag the photo to choose which area stays in the frame.")
      );
    },
  });

  CMS.registerWidget("focalPoint", FocalControl);
})();

(function () {
  var h = window.h;
  var createClass = window.createClass;
  var CMS = window.CMS;

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

  function isRealPhoto(img) {
    if (!img) return false;
    if (img.closest && img.closest(".focal-frame")) return false;
    var src = img.currentSrc || img.src || "";
    if (!src || src.indexOf("empty.svg") !== -1) return false;
    if (img.naturalWidth > 0 && img.naturalWidth < 4) return false;
    return /blob:|data:image|assets\/blog|raw\.githubusercontent/i.test(src) || img.naturalWidth > 40;
  }

  function findNeighborPhoto(start) {
    if (!start) return "";
    var imgs = document.querySelectorAll("img");
    var closest = "";
    for (var i = 0; i < imgs.length; i += 1) {
      if (!isRealPhoto(imgs[i])) continue;
      if (start.contains && start.contains(imgs[i])) continue;
      if (imgs[i].compareDocumentPosition(start) & Node.DOCUMENT_POSITION_FOLLOWING) {
        closest = imgs[i].currentSrc || imgs[i].src;
      }
    }
    if (closest) return closest;
    var node = start;
    while (node && node !== document.body) {
      var sib = node.previousElementSibling;
      while (sib) {
        var nested = sib.querySelectorAll("img");
        for (var j = nested.length - 1; j >= 0; j -= 1) {
          if (isRealPhoto(nested[j])) return nested[j].currentSrc || nested[j].src;
        }
        var bg = window.getComputedStyle(sib).backgroundImage;
        if (bg && bg.indexOf("blob:") !== -1) {
          return bg.replace(/^url\(["']?/, "").replace(/["']?\)$/, "");
        }
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
      var src = findNeighborPhoto(this._root);
      if (src && src !== this.state.src) this.setState({ src: src });
    },
    setPair: function (x, y) {
      x = Math.min(100, Math.max(0, Math.round(x)));
      y = Math.min(100, Math.max(0, Math.round(y)));
      this.props.onChange(x + " " + y);
    },
    pointFromEvent: function (event) {
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
      this._last = null;
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

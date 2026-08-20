(function () {
  var h = window.h;
  var createClass = window.createClass;
  var CMS = window.CMS;

  function parsePair(value) {
    var raw = value;
    if (raw && typeof raw.get === "function") raw = raw.get("x") != null ? raw.get("x") + " " + raw.get("y") : raw.toJS && JSON.stringify(raw.toJS());
    var text = String(raw == null ? "50 50" : raw).trim();
    var parts = text.split(/[\s,]+/);
    var x = Number(parts[0]);
    var y = Number(parts[1]);
    if (isNaN(x)) x = 50;
    if (isNaN(y)) y = 50;
    return {
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    };
  }

  function assetSrc(getAsset, path) {
    if (!path) return "";
    try {
      var asset = getAsset(path);
      var url = asset && (asset.url || (asset.toString && asset.toString()));
      if (url && String(url).indexOf("empty.svg") === -1) return url;
    } catch (err) {
      /* ignore */
    }
    var text = String(path);
    if (text.indexOf("http") === 0 || text.indexOf("blob:") === 0) return text;
    return text.charAt(0) === "/" ? text : text ? "/" + text : "";
  }

  var FocalControl = createClass({
    componentDidMount: function () {
      var self = this;
      this._ticks = 0;
      this._timer = setInterval(function () {
        self._ticks += 1;
        self.forceUpdate();
        if (self._ticks > 20) clearInterval(self._timer);
      }, 400);
    },
    componentWillUnmount: function () {
      clearInterval(this._timer);
    },
    mediaSrc: function () {
      var getAsset = this.props.getAsset;
      var field = this.props.field;
      var mediaField = field && field.get && field.get("media_field");
      var path = "";
      if (this.props.entry && mediaField) {
        path = this.props.entry.getIn(["data", mediaField]);
      } else if (this.props.entry && !mediaField) {
        path = this.props.entry.getIn(["data", "cover"]);
      }
      if (path) return assetSrc(getAsset, path);
      var node = this.props.forID ? document.getElementById(this.props.forID) : null;
      var group = node && node.closest ? node.closest(".css-1f3sq4j, [class*='ListControl'], [class*='list-control']") : null;
      var parent = node && node.parentElement;
      for (var i = 0; i < 8 && parent; i += 1) {
        var img = parent.querySelector && parent.querySelector("img");
        if (img && img.src && img.src.indexOf("empty.svg") === -1) return img.src;
        parent = parent.parentElement;
      }
      if (group) {
        var found = group.querySelector("img");
        if (found && found.src) return found.src;
      }
      return "";
    },
    handleClick: function (event) {
      var rect = event.currentTarget.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var x = Math.round(((event.clientX - rect.left) / rect.width) * 100);
      var y = Math.round(((event.clientY - rect.top) / rect.height) * 100);
      x = Math.min(100, Math.max(0, x));
      y = Math.min(100, Math.max(0, y));
      this.props.onChange(x + " " + y);
    },
    render: function () {
      var pair = parsePair(this.props.value);
      var src = this.mediaSrc();
      return h("div", { className: this.props.classNameWrapper },
        h("div", {
          onClick: this.handleClick,
          style: {
            position: "relative",
            width: "100%",
            height: "200px",
            overflow: "hidden",
            borderRadius: "12px",
            background: "#1a2330",
            cursor: "crosshair",
            border: "1px solid rgba(0,0,0,0.12)",
          },
        },
          src
            ? h("img", {
              src: src,
              alt: "",
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
              style: { margin: 0, padding: "16px", color: "#6e7f94", fontSize: "13px" },
            }, "Add a photo first, then click this box to choose the visible area."),
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
        }, "Click the photo to choose which area stays in the frame.")
      );
    },
  });

  CMS.registerWidget("focalPoint", FocalControl);
})();

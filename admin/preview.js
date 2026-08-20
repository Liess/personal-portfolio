(function () {
  var h = window.h;
  var createClass = window.createClass;
  var CMS = window.CMS;

  function text(entry, key) {
    var value = entry.getIn(["data", key]);
    if (value == null) return "";
    return typeof value === "string" ? value : String(value);
  }

  function listOf(value) {
    if (!value) return [];
    if (typeof value.toJS === "function") return value.toJS();
    if (Array.isArray(value)) return value;
    if (typeof value === "string") {
      return value
        .split(",")
        .map(function (part) {
          return part.trim();
        })
        .filter(Boolean);
    }
    return [];
  }

  function hasMedia(value) {
    if (window.CMSMedia && window.CMSMedia.hasMedia) return window.CMSMedia.hasMedia(value);
    if (value == null || value === false) return false;
    var path = typeof value === "string" ? value : String(value);
    return Boolean(path) && path !== "undefined" && path !== "[object Object]";
  }

  function assetUrl(getAsset, value, entry) {
    if (window.CMSMedia && window.CMSMedia.resolve) {
      return window.CMSMedia.resolve(getAsset, value, null, entry);
    }
    if (!hasMedia(value) || !getAsset) return "";
    try {
      var asset = getAsset(value);
      return asset && (asset.url || asset.toString()) || "";
    } catch (err) {
      return "";
    }
  }

  function isEditorPhoto(img) {
    if (!img || (img.closest && img.closest(".focal-frame"))) return false;
    var src = img.currentSrc || img.src || "";
    if (!src || src.indexOf("empty.svg") !== -1) return false;
    return /blob:|data:image|assets\/blog|raw\.githubusercontent/i.test(src) || img.naturalWidth > 40;
  }

  function editorPhotos() {
    try {
      var doc = window.parent && window.parent !== window ? window.parent.document : document;
      var imgs = doc.querySelectorAll("img");
      var out = [];
      for (var i = 0; i < imgs.length; i += 1) {
        if (isEditorPhoto(imgs[i])) out.push(imgs[i].currentSrc || imgs[i].src);
      }
      return out;
    } catch (err) {
      return [];
    }
  }

  function liveSrc(getAsset, path, fallback, entry) {
    var url = assetUrl(getAsset, path, entry);
    if (url && (url.indexOf("blob:") === 0 || url.indexOf("data:") === 0)) return url;
    if (fallback && (String(fallback).indexOf("blob:") === 0 || String(fallback).indexOf("data:") === 0)) {
      return fallback;
    }
    return url || fallback || "";
  }

  function parseFocus(value) {
    var raw = value;
    if (raw && typeof raw.toJS === "function") raw = raw.toJS();
    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      return (Number(raw.x) || 50) + "% " + (Number(raw.y) || 50) + "%";
    }
    var text = String(raw == null ? "50 50" : raw).trim();
    var parts = text.split(/[\s,]+/);
    var x = Number(parts[0]);
    var y = Number(parts[1]);
    if (isNaN(x)) x = 50;
    if (isNaN(y)) y = 50;
    return x + "% " + y + "%";
  }

  function galleryValues(entry) {
    return listOf(entry.getIn(["data", "gallery"]))
      .map(function (item) {
        if (!item) return null;
        if (typeof item === "string") return { src: item, focus: "50% 50%" };
        var src = item.image || item.src || "";
        if (!hasMedia(src)) return null;
        return { src: src, focus: parseFocus(item.focus || item) };
      })
      .filter(Boolean);
  }

  var BlogPreview = createClass({
    componentDidMount: function () {
      var self = this;
      this._timer = setInterval(function () {
        self.forceUpdate();
      }, 400);
    },
    componentWillUnmount: function () {
      clearInterval(this._timer);
    },
    render: function () {
      var entry = this.props.entry;
      var getAsset = this.props.getAsset;
      var title = text(entry, "title") || "Untitled";
      var cardTitle = text(entry, "card_title");
      var excerpt = text(entry, "excerpt");
      var location = text(entry, "location");
      var country = text(entry, "country");
      var place = location ? [location, country].filter(Boolean).join(" · ") : "";
      var coverValue = entry.getIn(["data", "cover"]);
      var coverFocus = parseFocus(entry.getIn(["data", "cover_focus"]));
      var photos = galleryValues(entry);
      var livePhotos = editorPhotos();
      var coverSrc = hasMedia(coverValue)
        ? liveSrc(getAsset, coverValue, livePhotos[0], entry)
        : "";
      var galleryLive = hasMedia(coverValue) ? livePhotos.slice(1) : livePhotos;
      var pageCount = Math.max(1, Math.ceil(photos.length / 5));
      var visible = photos.slice(0, 5);

      return h("div", { className: "cms-preview-blog" },
        h("header", { className: "site-header" },
          h("div", { className: "header-inner" },
            h("a", { className: "brand", href: "#" },
              h("span", {}, "EJ"),
              h("small", {}, "/ Maskariño")
            )
          )
        ),
        h("main", { className: "quest blog-page" },
          h("section", { className: "quest-hero" },
            h("div", { className: "wide" },
              cardTitle ? h("p", { className: "eyebrow" }, cardTitle) : null,
              h("h1", { className: "display" }, title),
              excerpt ? h("p", { className: "lead quest-lead" }, excerpt) : null,
              place ? h("p", { className: "blog-place" }, place) : null,
              h("div", { className: "quest-jump" },
                h("a", { href: "#" }, "← Blogs")
              )
            )
          ),
          h("section", { className: "blog-main" },
            h("div", { className: "blog-article" },
              hasMedia(coverValue)
                ? h("figure", { className: "blog-cover-frame" },
                    h("img", {
                      className: "blog-cover",
                      src: coverSrc,
                      alt: title,
                      style: { objectPosition: coverFocus },
                    })
                  )
                : null,
              visible.length
                ? h("div", { className: "blog-gallery-wrap" },
                    h("div", { className: "blog-gallery-viewport" },
                      h("div", {
                        className: "blog-gallery-page is-static",
                        style: {
                          display: "grid",
                          gridTemplateColumns: "repeat(" + visible.length + ", minmax(0, 1fr))",
                        },
                      },
                        visible.map(function (photo, index) {
                          return h("img", {
                            key: String(photo.src) + index,
                            src: liveSrc(getAsset, photo.src, galleryLive[index], entry),
                            alt: "",
                            style: { objectPosition: photo.focus },
                          });
                        })
                      )
                    ),
                    photos.length > 5
                      ? h("div", { className: "blog-gallery-bar" },
                          h("span", { className: "blog-gallery-num" }, "1 / " + pageCount)
                        )
                      : null
                  )
                : null,
              h("article", { className: "blog-body" }, this.props.widgetFor("body"))
            )
          )
        )
      );
    },
  });

  CMS.registerPreviewStyle("/css/styles.css");
  CMS.registerPreviewStyle("/admin/preview.css?v=restore-image");
  CMS.registerPreviewStyle("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap");
  CMS.registerPreviewTemplate("blog", BlogPreview);
})();

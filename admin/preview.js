(function () {
  var h = window.h;
  var createClass = window.createClass;
  var CMS = window.CMS;

  function text(entry, key) {
    var value = entry.getIn(["data", key]);
    return value == null ? "" : String(value);
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

  function assetUrl(getAsset, path) {
    if (!path) return "";
    var asset = getAsset(path);
    if (!asset) return String(path);
    return typeof asset.toString === "function" ? asset.toString() : String(asset);
  }

  function galleryPaths(entry) {
    return listOf(entry.getIn(["data", "gallery"]))
      .map(function (item) {
        if (!item) return "";
        if (typeof item === "string") return item;
        return item.image || item.src || "";
      })
      .filter(Boolean);
  }

  var BlogPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var getAsset = this.props.getAsset;
      var title = text(entry, "title") || "Untitled";
      var cardTitle = text(entry, "card_title");
      var excerpt = text(entry, "excerpt");
      var location = text(entry, "location");
      var country = text(entry, "country");
      var place = location ? [location, country].filter(Boolean).join(" · ") : "";
      var cover = assetUrl(getAsset, text(entry, "cover"));
      var photos = galleryPaths(entry);
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
              cover
                ? h("figure", { className: "blog-cover-frame" },
                    h("img", { className: "blog-cover", src: cover, alt: title })
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
                        visible.map(function (src, index) {
                          return h("img", {
                            key: src + index,
                            src: assetUrl(getAsset, src),
                            alt: "",
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
  CMS.registerPreviewStyle("/admin/preview.css");
  CMS.registerPreviewStyle("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap");
  CMS.registerPreviewTemplate("blog", BlogPreview);
})();

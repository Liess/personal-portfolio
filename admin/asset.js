(function (root) {
  var cache = root.__cmsMediaCache || {};
  root.__cmsMediaCache = cache;

  function basename(path) {
    return String(path || "")
      .split("?")[0]
      .split("#")[0]
      .split("/")
      .filter(Boolean)
      .pop() || "";
  }

  function hasMedia(value) {
    if (value == null || value === false) return false;
    var path = typeof value === "string" ? value : String(value);
    return Boolean(path) && path !== "undefined" && path !== "[object Object]" && path.indexOf("empty.svg") === -1;
  }

  function isUsableUrl(url) {
    return Boolean(url) && typeof url === "string" && url.indexOf("empty.svg") === -1 && url.indexOf("[object") === -1;
  }

  function isBlobUrl(url) {
    return url.indexOf("blob:") === 0 || url.indexOf("data:") === 0;
  }

  function remember(path, url) {
    if (!isUsableUrl(url) || !isBlobUrl(url)) return;
    var name = basename(path).toLowerCase();
    if (name) cache[name] = url;
  }

  function listMediaFiles(entry) {
    if (!entry) return [];
    var files = typeof entry.get === "function" ? entry.get("mediaFiles") : entry.mediaFiles;
    if (!files) return [];
    if (typeof files.toJS === "function") return files.toJS();
    if (Array.isArray(files)) return files;
    return [];
  }

  function urlFromFile(file) {
    if (!file) return "";
    if (typeof file.displayURL === "string" && isUsableUrl(file.displayURL)) {
      remember(file.path || file.name, file.displayURL);
      return file.displayURL;
    }
    if (file.url && isBlobUrl(String(file.url))) {
      remember(file.path || file.name, file.url);
      return file.url;
    }
    if (file.file) {
      try {
        var url = URL.createObjectURL(file.file);
        remember(file.path || file.name, url);
        return url;
      } catch (err) {
        return "";
      }
    }
    if (file.displayURL && typeof file.displayURL === "object") {
      var nested = file.displayURL.url || file.displayURL.path || "";
      if (isUsableUrl(nested)) return nested;
    }
    return "";
  }

  function fromEntry(entry, value) {
    var name = basename(value).toLowerCase();
    if (!name) return "";
    if (cache[name]) return cache[name];
    var files = listMediaFiles(entry);
    for (var i = 0; i < files.length; i += 1) {
      var file = files[i] || {};
      var fileName = basename(file.path || file.name || "").toLowerCase();
      if (fileName === name) return urlFromFile(file);
    }
    return "";
  }

  function relativePath(value) {
    var name = basename(value);
    return name ? "assets/blog/" + name : "";
  }

  function fromGetAsset(getAsset, value, field) {
    if (!getAsset) return "";
    var path = relativePath(value);
    if (!path) return "";
    try {
      var asset = field ? getAsset(path, field) : getAsset(path);
      if (!asset) return "";
      var url = asset.url || (typeof asset.toString === "function" ? asset.toString() : "");
      if (!isUsableUrl(url)) return "";
      remember(path, url);
      return url;
    } catch (err) {
      return "";
    }
  }

  function publicPath(value) {
    var path = typeof value === "string" ? value : String(value || "");
    if (path.indexOf("http") === 0 || isBlobUrl(path)) return path;
    return path.charAt(0) === "/" ? path : "/" + path.replace(/^\/+/, "");
  }

  function resolve(getAsset, value, field, entry) {
    if (!hasMedia(value)) return "";
    var path = typeof value === "string" ? value : String(value);
    if (isBlobUrl(path)) return path;
    var name = basename(path).toLowerCase();
    if (name && cache[name]) return cache[name];
    var draft = fromEntry(entry, path);
    if (draft) return draft;
    var asset = fromGetAsset(getAsset, path, field);
    if (asset && isBlobUrl(asset)) return asset;
    if (name && cache[name]) return cache[name];
    if (asset && isUsableUrl(asset) && asset.indexOf("assets/blog/") !== 0) return asset;
    return publicPath(path);
  }

  function patchGetAsset(getAsset, field) {
    if (!getAsset) return getAsset;
    return function (path, widgetField) {
      var name = basename(path);
      if (name) return getAsset("assets/blog/" + name, widgetField || field);
      return getAsset(path, widgetField || field);
    };
  }

  function wrapImageWidget() {
    var CMS = root.CMS;
    var createClass = root.createClass;
    var h = root.h;
    if (!CMS || !createClass || !h || typeof CMS.getWidget !== "function") return;
    var widget = CMS.getWidget("image");
    if (!widget || !widget.control || widget.control.__draftPatched) return;
    var Control = widget.control;
    var Wrapped = createClass({
      render: function () {
        var next = {};
        for (var key in this.props) {
          if (Object.prototype.hasOwnProperty.call(this.props, key)) next[key] = this.props[key];
        }
        next.getAsset = patchGetAsset(this.props.getAsset, this.props.field);
        return h(Control, next);
      },
    });
    Wrapped.__draftPatched = true;
    CMS.registerWidget("image", Wrapped, widget.preview);
  }

  wrapImageWidget();

  root.CMSMedia = {
    basename: basename,
    hasMedia: hasMedia,
    remember: remember,
    resolve: resolve,
    patchGetAsset: patchGetAsset,
  };
})(window);

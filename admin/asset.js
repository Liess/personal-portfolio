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

  function candidates(value) {
    var path = typeof value === "string" ? value : String(value || "");
    var name = basename(path);
    var list = [];
    function add(item) {
      if (item && list.indexOf(item) === -1) list.push(item);
    }
    if (name) {
      add("assets/blog/" + name);
      add(name);
    }
    if (path && path.indexOf("http") !== 0 && path.indexOf("blob:") !== 0) {
      add(path.replace(/^\/+/, ""));
    }
    return list;
  }

  function resolve(getAsset, value, field) {
    if (!hasMedia(value)) return "";
    var path = typeof value === "string" ? value : String(value);
    if (path.indexOf("blob:") === 0 || path.indexOf("data:") === 0) return path;
    var name = basename(path).toLowerCase();
    if (name && cache[name]) return cache[name];
    if (!getAsset) return path.charAt(0) === "/" ? path : "/" + path.replace(/^\/+/, "");
    var fallback = "";
    var paths = candidates(path);
    for (var i = 0; i < paths.length; i += 1) {
      try {
        var asset = field ? getAsset(paths[i], field) : getAsset(paths[i]);
        if (!asset) continue;
        var url = asset.url || (typeof asset.toString === "function" ? asset.toString() : "");
        if (!isUsableUrl(url)) continue;
        remember(paths[i], url);
        if (isBlobUrl(url)) return url;
        if (!fallback) fallback = url;
      } catch (err) {
        /* try the next candidate */
      }
    }
    if (name && cache[name]) return cache[name];
    if (fallback) return fallback;
    if (path.indexOf("http") === 0) return path;
    return path.charAt(0) === "/" ? path : "/" + path.replace(/^\/+/, "");
  }

  root.CMSMedia = {
    basename: basename,
    hasMedia: hasMedia,
    remember: remember,
    resolve: resolve,
  };
})(window);

(function () {
  var sortKey = "decap-cms.entries.sort";
  var postedSort = {
    blog: {
      date: { key: "date", direction: "Descending", index: 0 },
    },
  };

  try {
    localStorage.setItem(sortKey, JSON.stringify(postedSort));
  } catch (err) {
    /* ignore */
  }

  var months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  function prettyDate(raw) {
    var text = String(raw || "").trim();
    var match = text.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return text;
    return months[Number(match[2]) - 1] + " " + Number(match[3]) + ", " + match[1];
  }

  function decorate() {
    var headings = document.querySelectorAll("h2");
    for (var i = 0; i < headings.length; i += 1) {
      var heading = headings[i];
      if (heading.getAttribute("data-posted-split") === "1") continue;
      var text = heading.textContent || "";
      if (text.indexOf("|||") === -1) continue;
      var parts = text.split("|||");
      heading.setAttribute("data-posted-split", "1");
      heading.textContent = "";
      heading.style.display = "flex";
      heading.style.alignItems = "center";
      heading.style.justifyContent = "space-between";
      heading.style.gap = "16px";
      var title = document.createElement("span");
      title.textContent = parts[0].trim();
      var date = document.createElement("span");
      date.textContent = prettyDate(parts.slice(1).join("|||"));
      date.style.cssText = "margin-left:auto;color:#79879a;font-weight:500;font-size:13px;white-space:nowrap;";
      heading.appendChild(title);
      heading.appendChild(date);
    }
  }

  var observer = new MutationObserver(decorate);
  if (document.body) observer.observe(document.body, { childList: true, subtree: true });
  else document.addEventListener("DOMContentLoaded", function () {
    observer.observe(document.body, { childList: true, subtree: true });
    decorate();
  });
})();

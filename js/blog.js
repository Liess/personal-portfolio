function escapeBlog(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatPostedDate(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const date = new Date(/T/.test(raw) ? raw : `${raw.slice(0, 10)}T12:00:00`);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function parseFrontMatter(raw) {
  const text = String(raw).replace(/^\uFEFF/, "");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: text.trim() };

  const data = {};
  const lines = match[1].split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) {
      i += 1;
      continue;
    }
    const keyed = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!keyed) {
      i += 1;
      continue;
    }
    const key = keyed[1];
    const rest = keyed[2];
    if (rest === "" || rest === "[]" || rest === "~") {
      i += 1;
      if (i < lines.length && /^\s*-/.test(lines[i])) {
        const items = [];
        while (i < lines.length && /^\s*-/.test(lines[i])) {
          const indent = (lines[i].match(/^(\s*)/) || [""])[1].length;
          const rest = lines[i].replace(/^\s*-\s*/, "").trim();
          const objKey = rest.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
          if (objKey) {
            const obj = {};
            obj[objKey[1]] = unquote(objKey[2]);
            i += 1;
            while (i < lines.length && lines[i].trim() && !/^\s*-/.test(lines[i]) && (lines[i].match(/^(\s*)/) || [""])[1].length > indent) {
              const nested = lines[i].match(/^\s+([A-Za-z0-9_]+):\s*(.*)$/);
              if (nested) obj[nested[1]] = unquote(nested[2]);
              i += 1;
            }
            items.push(obj);
            continue;
          }
          const nested = rest.match(/^image:\s*(.*)$/) || rest.match(/^tag:\s*(.*)$/);
          const value = nested ? unquote(nested[1]) : unquote(rest);
          if (value) items.push(value);
          i += 1;
        }
        data[key] = items;
        continue;
      }
      if (i < lines.length && /^\s+[A-Za-z0-9_]+:/.test(lines[i])) {
        const obj = {};
        while (i < lines.length && /^\s+[A-Za-z0-9_]+:/.test(lines[i])) {
          const nested = lines[i].match(/^\s+([A-Za-z0-9_]+):\s*(.*)$/);
          if (!nested) break;
          obj[nested[1]] = unquote(nested[2]);
          i += 1;
        }
        data[key] = obj;
        continue;
      }
      data[key] = [];
      continue;
    }
    if (/^\[.*\]$/.test(rest)) {
      data[key] = rest
        .slice(1, -1)
        .split(",")
        .map((item) => unquote(item))
        .filter(Boolean);
      i += 1;
      continue;
    }
    data[key] = unquote(rest);
    i += 1;
  }
  return { data, body: match[2].trim() };
}

function unquote(value) {
  const text = String(value || "").trim();
  if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
    return text.slice(1, -1);
  }
  if (text === "true") return true;
  if (text === "false") return false;
  if (text === '""' || text === "''") return "";
  return text;
}

function clampFocus(value) {
  const number = Number(value);
  if (Number.isNaN(number)) return 50;
  return Math.min(100, Math.max(0, number));
}

function parseFocus(value, extra) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return { x: clampFocus(value.x), y: clampFocus(value.y) };
  }
  if (typeof value === "string" && /\d/.test(value)) {
    const parts = value.trim().split(/[\s,]+/);
    return { x: clampFocus(parts[0]), y: clampFocus(parts[1]) };
  }
  if (extra) {
    return { x: clampFocus(extra.x), y: clampFocus(extra.y) };
  }
  return { x: 50, y: 50 };
}

function focusStyle(focus) {
  const point = parseFocus(focus);
  return `${point.x}% ${point.y}%`;
}

function normalizeGallery(raw) {
  return (Array.isArray(raw) ? raw : [])
    .map((item) => {
      if (!item) return null;
      if (typeof item === "string") return { src: item, focus: { x: 50, y: 50 } };
      const src = item.image || item.src || "";
      if (!src) return null;
      return { src, focus: parseFocus(item.focus, item) };
    })
    .filter(Boolean);
}

function isPublished(post) {
  return post.published === true || post.published === "true";
}

function loadBlogPosts() {
  return fetch("https://api.github.com/repos/Liess/personal-portfolio/contents/content/blog", {
    headers: { Accept: "application/vnd.github+json" },
  })
    .then((res) => {
      if (!res.ok) throw new Error("index");
      return res.json();
    })
    .then((files) => {
      const notes = (Array.isArray(files) ? files : []).filter((file) => file.type === "file" && /\.md$/i.test(file.name));
      return Promise.all(
        notes.map((file) =>
          fetch(file.download_url).then((res) => res.text()).then((raw) => {
            const parsed = parseFrontMatter(raw);
            const fallbackSlug = file.name.replace(/\.md$/i, "");
            const tags = normalizeTags(parsed.data);
            const gallery = normalizeGallery(parsed.data.gallery);
            const card = parsed.data.card && typeof parsed.data.card === "object" && !Array.isArray(parsed.data.card)
              ? parsed.data.card
              : {};
            return {
              slug: parsed.data.slug || fallbackSlug,
              title: parsed.data.title || fallbackSlug,
              travel_date: parsed.data.date || parsed.data.travel_date || parsed.data.posted_date || "",
              location: parsed.data.location || "",
              country: parsed.data.country || "",
              cover: parsed.data.cover || "",
              cover_focus: parseFocus(parsed.data.cover_focus),
              gallery,
              excerpt: parsed.data.excerpt || "",
              card_title: parsed.data.card_title || parsed.data["card-title"] || card.label || "",
              tags,
              showcase: parsed.data.showcase,
              published: parsed.data.published,
              body: parsed.body || "",
            };
          })
        )
      );
    })
    .then((posts) =>
      posts.sort((a, b) => String(b.travel_date).localeCompare(String(a.travel_date)))
    );
}

function normalizeTags(data) {
  const found = [];
  const push = (value) => {
    if (value == null || value === "") return;
    if (Array.isArray(value)) {
      value.forEach(push);
      return;
    }
    if (typeof value === "object") {
      push(value.tag || value.name);
      return;
    }
    String(value)
      .split(/[,|]/)
      .forEach((part) => {
        const tag = unquote(part);
        if (tag) found.push(tag);
      });
  };
  push(data.tags);
  push(data.tag);
  return found;
}

function hasTag(post, tag) {
  const want = String(tag || "").toLowerCase();
  return (post.tags || []).some((item) => String(item).toLowerCase() === want);
}

function isShowcase(post) {
  return post.showcase === true || post.showcase === "true" || hasTag(post, "showcase");
}

function renderBlogCards(root, posts, mode) {
  root.replaceChildren();
  if (!posts.length) {
    const empty = document.createElement("p");
    empty.className = "sub";
    empty.textContent =
      mode === "showcase"
        ? "No showcase posts yet. In the CMS, add a Tags item named showcase."
        : "No posts yet.";
    root.appendChild(empty);
    return;
  }
  posts.forEach((post) => {
    const published = isPublished(post);
    const node = document.createElement(published ? "a" : "article");
    if (published) {
      node.href = `blog.html?slug=${encodeURIComponent(post.slug)}`;
      node.className = "quest-blog-link";
    }
    const place = [post.location, post.country].filter(Boolean).join(", ");
    const kicker = post.card_title || "";
    const thumb = post.cover
      ? `<img class="quest-blog-thumb" src="${escapeBlog(post.cover)}" alt="" style="object-position:${escapeBlog(focusStyle(post.cover_focus))}">`
      : "";
    node.innerHTML = `
      ${thumb}
      <div class="quest-blog-copy">
        ${kicker ? `<p class="meta">${escapeBlog(kicker)}</p>` : ""}
        <h3>${escapeBlog(post.title || "Untitled")}</h3>
        <p>${escapeBlog(post.excerpt || "")}</p>
        <span class="quest-status">${escapeBlog(place || (published ? "Published" : "Draft"))}</span>
      </div>
    `;
    node.style.setProperty("--q", `${index * 90}ms`);
    root.appendChild(node);
  });
}

function initBlogList() {
  const root = document.querySelector("[data-blog-list]");
  if (!root) return;
  const mode = (root.getAttribute("data-blog-list") || "").trim();

  loadBlogPosts()
    .then((posts) => {
      const list = mode === "showcase" ? posts.filter(isShowcase).slice(0, 3) : posts;
      renderBlogCards(root, list, mode);
    })
    .catch(() => {
      renderBlogCards(root, [], mode);
    });
}

function addGalleryImage(page, photo) {
  const img = document.createElement("img");
  img.src = photo.src;
  img.alt = "";
  img.style.objectPosition = focusStyle(photo.focus);
  page.appendChild(img);
}

function renderBlogGallery(photos) {
  const wrap = document.getElementById("blog-gallery-wrap");
  const track = document.getElementById("blog-gallery");
  const bar = document.getElementById("blog-gallery-bar");
  const num = document.getElementById("blog-gallery-num");
  const prev = document.getElementById("blog-gallery-prev");
  const next = document.getElementById("blog-gallery-next");
  if (!wrap || !track) return;

  const list = (photos || []).filter((photo) => photo && photo.src);
  track.replaceChildren();
  track.style.transform = "";
  wrap.classList.remove("is-carousel");
  if (bar) bar.hidden = true;
  if (prev) prev.onclick = null;
  if (next) next.onclick = null;

  if (!list.length) {
    wrap.hidden = true;
    return;
  }

  wrap.hidden = false;
  const perPage = 5;
  const carousel = list.length > perPage;

  if (!carousel) {
    const page = document.createElement("div");
    page.className = "blog-gallery-page is-static";
    page.style.gridTemplateColumns = `repeat(${list.length}, minmax(0, 1fr))`;
    list.forEach((photo) => addGalleryImage(page, photo));
    track.appendChild(page);
    return;
  }

  const pages = [];
  for (let i = 0; i < list.length; i += perPage) {
    const page = document.createElement("div");
    page.className = "blog-gallery-page";
    list.slice(i, i + perPage).forEach((photo) => addGalleryImage(page, photo));
    track.appendChild(page);
    pages.push(page);
  }

  wrap.classList.add("is-carousel");
  if (bar) bar.hidden = false;

  let index = 0;
  const show = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    if (num) num.textContent = `${index + 1} / ${pages.length}`;
  };
  if (prev) {
    prev.onclick = () => {
      index = (index - 1 + pages.length) % pages.length;
      show();
    };
  }
  if (next) {
    next.onclick = () => {
      index = (index + 1) % pages.length;
      show();
    };
  }
  show();
}

function bindBlogLightbox() {
  const box = document.getElementById("blog-lightbox");
  const img = document.getElementById("blog-lightbox-img");
  const close = document.getElementById("blog-lightbox-close");
  const prev = document.getElementById("blog-lightbox-prev");
  const next = document.getElementById("blog-lightbox-next");
  if (!box || !img) return;

  const cover = document.getElementById("blog-cover");
  const coverFrame = document.getElementById("blog-cover-frame");
  const nodes = [];
  if (cover && coverFrame && !coverFrame.hidden && cover.getAttribute("src")) nodes.push(cover);
  document.querySelectorAll("#blog-gallery img, #blog-body img").forEach((el) => nodes.push(el));
  const sources = nodes.map((el) => el.getAttribute("src") || el.src).filter(Boolean);
  if (!sources.length) return;

  let index = 0;
  const show = (i) => {
    index = (i + sources.length) % sources.length;
    img.src = sources[index];
    img.alt = "";
    box.hidden = false;
    if (prev) prev.hidden = sources.length < 2;
    if (next) next.hidden = sources.length < 2;
  };
  const hide = () => {
    box.hidden = true;
    img.removeAttribute("src");
  };

  nodes.forEach((el, i) => {
    el.classList.add("blog-zoom");
    el.onclick = () => show(i);
  });
  if (close) close.onclick = hide;
  box.onclick = (event) => {
    if (event.target === box) hide();
  };
  if (prev) {
    prev.onclick = (event) => {
      event.stopPropagation();
      show(index - 1);
    };
  }
  if (next) {
    next.onclick = (event) => {
      event.stopPropagation();
      show(index + 1);
    };
  }
  document.addEventListener("keydown", (event) => {
    if (box.hidden) return;
    if (event.key === "Escape") hide();
    if (event.key === "ArrowLeft") show(index - 1);
    if (event.key === "ArrowRight") show(index + 1);
  });
}

function initBlogPost() {
  const titleEl = document.getElementById("blog-title");
  const tagEl = document.getElementById("blog-tag");
  const bodyEl = document.getElementById("blog-body");
  if (!titleEl || !bodyEl) return;

  const slug = new URLSearchParams(window.location.search).get("slug") || "";
  loadBlogPosts()
    .then((posts) => {
      const post = posts.find((item) => item.slug === slug && isPublished(item));
      if (!post) {
        titleEl.textContent = "Not published yet";
        if (tagEl) tagEl.textContent = "Blog";
        bodyEl.innerHTML = "<p>This note is still a draft, or the link is wrong.</p>";
        return;
      }
      document.title = `${post.title} | Ernest John Maskariño`;
      titleEl.textContent = post.title;
      if (tagEl) {
        if (post.card_title) {
          tagEl.textContent = post.card_title;
          tagEl.hidden = false;
        } else {
          tagEl.textContent = "";
          tagEl.hidden = true;
        }
      }
      const excerpt = document.getElementById("blog-excerpt");
      if (excerpt) excerpt.textContent = post.excerpt || "";
      const placeEl = document.getElementById("blog-place");
      const place = [post.location, post.country].filter(Boolean).join(" · ");
      if (placeEl) {
        if (post.location) {
          placeEl.textContent = place;
          placeEl.hidden = false;
        } else {
          placeEl.textContent = "";
          placeEl.hidden = true;
        }
      }
      const postedEl = document.getElementById("blog-posted");
      const posted = formatPostedDate(post.travel_date);
      if (postedEl) {
        if (posted) {
          postedEl.textContent = posted;
          postedEl.hidden = false;
        } else {
          postedEl.textContent = "";
          postedEl.hidden = true;
        }
      }
      const cover = document.getElementById("blog-cover");
      const coverFrame = document.getElementById("blog-cover-frame");
      if (cover && coverFrame) {
        if (post.cover) {
          cover.src = post.cover;
          cover.alt = post.title || "";
          cover.style.objectPosition = focusStyle(post.cover_focus);
          coverFrame.hidden = false;
        } else {
          cover.removeAttribute("src");
          coverFrame.hidden = true;
        }
      }
      renderBlogGallery(post.gallery || []);
      if (window.marked && typeof window.marked.parse === "function") {
        bodyEl.innerHTML = window.marked.parse(post.body || "");
      } else {
        bodyEl.textContent = post.body || "";
      }
      bindBlogLightbox();
    })
    .catch(() => {
      titleEl.textContent = "Could not load the post";
    });
}

initBlogList();
initBlogPost();

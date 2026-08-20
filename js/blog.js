function escapeBlog(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
          const item = lines[i].replace(/^\s*-\s*/, "").trim();
          const nested = item.match(/^image:\s*(.*)$/) || item.match(/^tag:\s*(.*)$/);
          const value = nested ? unquote(nested[1]) : unquote(item);
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
            const gallery = Array.isArray(parsed.data.gallery) ? parsed.data.gallery : [];
            const card = parsed.data.card && typeof parsed.data.card === "object" && !Array.isArray(parsed.data.card)
              ? parsed.data.card
              : {};
            return {
              slug: parsed.data.slug || fallbackSlug,
              title: parsed.data.title || fallbackSlug,
              travel_date: parsed.data.travel_date || parsed.data.date || "",
              location: parsed.data.location || "",
              country: parsed.data.country || "",
              cover: parsed.data.cover || "",
              gallery,
              excerpt: parsed.data.excerpt || "",
              card_image: card.image || parsed.data.card_image || parsed.data.cover || "",
              card_title: card.title || parsed.data.card_title || "",
              card_excerpt: card.excerpt || parsed.data.card_excerpt || "",
              card_label: card.label || parsed.data.card_label || "",
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
    const title = post.card_title || post.title || "Untitled";
    const excerpt = post.card_excerpt || post.excerpt || "";
    const label =
      post.card_label ||
      (post.tags || []).find((tag) => String(tag).toLowerCase() !== "showcase") ||
      (isShowcase(post) ? "Showcase" : "") ||
      post.country ||
      "Note";
    const thumb = post.card_image
      ? `<img class="quest-blog-thumb" src="${escapeBlog(post.card_image)}" alt="">`
      : "";
    node.innerHTML = `
      ${thumb}
      <div class="quest-blog-copy">
        <p class="meta">${escapeBlog(label)}</p>
        <h3>${escapeBlog(title)}</h3>
        <p>${escapeBlog(excerpt)}</p>
        <span class="quest-status">${escapeBlog(place || (published ? "Published" : "Draft"))}</span>
      </div>
    `;
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

function renderBlogGallery(srcs) {
  const wrap = document.getElementById("blog-gallery-wrap");
  const track = document.getElementById("blog-gallery");
  const bar = document.getElementById("blog-gallery-bar");
  const num = document.getElementById("blog-gallery-num");
  const prev = document.getElementById("blog-gallery-prev");
  const next = document.getElementById("blog-gallery-next");
  if (!wrap || !track) return;

  const photos = srcs.filter(Boolean);
  track.replaceChildren();
  track.style.transform = "";
  wrap.classList.remove("is-carousel");
  if (bar) bar.hidden = true;
  if (prev) prev.onclick = null;
  if (next) next.onclick = null;

  if (!photos.length) {
    wrap.hidden = true;
    return;
  }

  wrap.hidden = false;
  const perPage = 5;
  const carousel = photos.length > perPage;

  if (!carousel) {
    const page = document.createElement("div");
    page.className = "blog-gallery-page is-static";
    page.style.gridTemplateColumns = `repeat(${photos.length}, minmax(0, 1fr))`;
    photos.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      page.appendChild(img);
    });
    track.appendChild(page);
    return;
  }

  const pages = [];
  for (let i = 0; i < photos.length; i += perPage) {
    const page = document.createElement("div");
    page.className = "blog-gallery-page";
    photos.slice(i, i + perPage).forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      page.appendChild(img);
    });
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
      const label =
        post.card_label ||
        (post.tags || []).find((tag) => String(tag).toLowerCase() !== "showcase") ||
        "Blog";
      if (tagEl) tagEl.textContent = label;
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
      const cover = document.getElementById("blog-cover");
      const coverFrame = document.getElementById("blog-cover-frame");
      if (cover && coverFrame) {
        if (post.cover) {
          cover.src = post.cover;
          cover.alt = post.title || "";
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
    })
    .catch(() => {
      titleEl.textContent = "Could not load the post";
    });
}

initBlogList();
initBlogPost();

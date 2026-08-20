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
    if (rest === "" || rest === "[]") {
      const items = [];
      i += 1;
      while (i < lines.length && /^\s+-/.test(lines[i])) {
        const item = lines[i].replace(/^\s+-\s*/, "").trim();
        const nested = item.match(/^image:\s*(.*)$/) || item.match(/^tag:\s*(.*)$/);
        const value = nested ? unquote(nested[1]) : unquote(item);
        if (value) items.push(value);
        i += 1;
      }
      data[key] = items;
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
            const tags = Array.isArray(parsed.data.tags)
              ? parsed.data.tags
              : parsed.data.tag
                ? [parsed.data.tag]
                : [];
            const gallery = Array.isArray(parsed.data.gallery) ? parsed.data.gallery : [];
            return {
              slug: parsed.data.slug || fallbackSlug,
              title: parsed.data.title || fallbackSlug,
              travel_date: parsed.data.travel_date || parsed.data.date || "",
              location: parsed.data.location || "",
              country: parsed.data.country || "",
              cover: parsed.data.cover || "",
              gallery,
              excerpt: parsed.data.excerpt || "",
              tags,
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

function hasTag(post, tag) {
  const want = String(tag || "").toLowerCase();
  return (post.tags || []).some((item) => String(item).toLowerCase() === want);
}

function renderBlogCards(root, posts) {
  root.replaceChildren();
  posts.forEach((post) => {
    const published = isPublished(post);
    const node = document.createElement(published ? "a" : "article");
    if (published) {
      node.href = `blog.html?slug=${encodeURIComponent(post.slug)}`;
      node.className = "quest-blog-link";
    }
    const place = [post.location, post.country].filter(Boolean).join(", ");
    node.innerHTML = `
      <p class="meta">${escapeBlog((post.tags || []).filter((tag) => tag.toLowerCase() !== "showcase")[0] || post.country || "Note")}</p>
      <h3>${escapeBlog(post.title || "Untitled")}</h3>
      <p>${escapeBlog(post.excerpt || "")}</p>
      <span class="quest-status">${escapeBlog(place || (published ? "Published" : "Draft"))}</span>
    `;
    root.appendChild(node);
  });
}

function initBlogList() {
  const root = document.querySelector("[data-blog-list]");
  if (!root) return;
  const mode = root.getAttribute("data-blog-list");

  loadBlogPosts()
    .then((posts) => {
      const list =
        mode === "showcase"
          ? posts.filter((post) => hasTag(post, "showcase")).slice(0, 3)
          : posts;
      if (mode === "showcase" && !list.length) return;
      renderBlogCards(root, list);
    })
    .catch(() => {});
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
      const place = [post.location, post.country].filter(Boolean).join(" · ");
      if (tagEl) tagEl.textContent = place || (post.tags && post.tags[0]) || "Blog";
      const excerpt = document.getElementById("blog-excerpt");
      if (excerpt) excerpt.textContent = post.excerpt || "";
      const cover = document.getElementById("blog-cover");
      if (cover) {
        if (post.cover) {
          cover.src = post.cover;
          cover.hidden = false;
        } else {
          cover.hidden = true;
        }
      }
      const gallery = document.getElementById("blog-gallery");
      if (gallery) {
        gallery.replaceChildren();
        post.gallery.forEach((src) => {
          const img = document.createElement("img");
          img.src = src;
          img.alt = "";
          gallery.appendChild(img);
        });
        gallery.hidden = !post.gallery.length;
      }
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

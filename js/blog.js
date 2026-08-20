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
  match[1].split(/\r?\n/).forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  });
  return { data, body: match[2].trim() };
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
            const slug = file.name.replace(/\.md$/i, "");
            return {
              slug,
              title: parsed.data.title || slug,
              tag: parsed.data.tag || "Note",
              status: parsed.data.status || "Queued",
              date: parsed.data.date || "",
              excerpt: parsed.data.excerpt || "",
              body: parsed.body || "",
            };
          })
        )
      );
    })
    .then((posts) =>
      posts.sort((a, b) => String(b.date).localeCompare(String(a.date)))
    );
}

function initBlogList() {
  const root = document.querySelector(".quest-blogs");
  if (!root) return;

  loadBlogPosts()
    .then((posts) => {
      if (!posts.length) return;
      root.replaceChildren();
      posts.forEach((post) => {
        const published = post.status === "Published";
        const node = document.createElement(published ? "a" : "article");
        if (published) {
          node.href = `blog.html?slug=${encodeURIComponent(post.slug)}`;
          node.className = "quest-blog-link";
        }
        node.innerHTML = `
          <p class="meta">${escapeBlog(post.tag || "Note")}</p>
          <h3>${escapeBlog(post.title || "Untitled")}</h3>
          <p>${escapeBlog(post.excerpt || "")}</p>
          <span class="quest-status">${escapeBlog(post.status || "Queued")}</span>
        `;
        root.appendChild(node);
      });
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
      const post = posts.find((item) => item.slug === slug && item.status === "Published");
      if (!post) {
        titleEl.textContent = "Not published yet";
        if (tagEl) tagEl.textContent = "Blog";
        bodyEl.innerHTML = "<p>This note is still a draft, or the link is wrong.</p>";
        return;
      }
      document.title = `${post.title} | Ernest John Maskariño`;
      titleEl.textContent = post.title;
      if (tagEl) tagEl.textContent = post.tag || "Blog";
      const excerpt = document.getElementById("blog-excerpt");
      if (excerpt) excerpt.textContent = post.excerpt || "";
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

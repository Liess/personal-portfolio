function escapeBlog(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function loadBlogData() {
  return fetch("data/blog.json", { cache: "no-store" }).then((res) => {
    if (!res.ok) throw new Error("blog");
    return res.json();
  });
}

function initBlogList() {
  const root = document.querySelector(".quest-blogs");
  if (!root) return;

  loadBlogData()
    .then((data) => {
      const posts = Array.isArray(data.posts) ? data.posts : [];
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
  loadBlogData()
    .then((data) => {
      const posts = Array.isArray(data.posts) ? data.posts : [];
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

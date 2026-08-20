const GH_AUTHORIZE = "https://github.com/login/oauth/authorize";
const GH_TOKEN = "https://github.com/login/oauth/access_token";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/admin/config.yml" || url.pathname === "/admin/config.yaml") {
      return cmsConfig(url);
    }
    if (url.pathname === "/oauth") return oauthStart(url, env);
    if (url.pathname === "/callback") return oauthCallback(request, url, env);
    return env.ASSETS.fetch(request);
  },
};

function cmsConfig(url) {
  const origin = url.origin;
  const yaml = `backend:
  name: github
  repo: Liess/personal-portfolio
  branch: main
  base_url: ${origin}
  auth_endpoint: oauth
site_url: ${origin}
display_url: ${origin}/side-quest.html#blogs
media_folder: assets/blog
public_folder: /assets/blog
publish_mode: simple
collections:
  - name: blog
    label: Blog
    label_singular: Post
    folder: content/blog
    create: true
    delete: true
    slug: "{{fields.slug}}"
    extension: md
    format: yaml-frontmatter
    preview_path: blog.html?slug={{slug}}
    sortable_fields: ["travel_date", "title", "country"]
    view_groups:
      - label: Country
        field: country
    identifier_field: slug
    fields:
      - { label: Title, name: title, widget: string }
      - { label: Slug, name: slug, widget: string, hint: "URL key, e.g. boracay-white-beach" }
      - { label: Travel Date, name: travel_date, widget: datetime, date_format: "YYYY-MM-DD", time_format: false }
      - { label: Location, name: location, widget: string, hint: "City or spot" }
      - { label: Country, name: country, widget: string }
      - { label: Cover Image, name: cover, widget: image, required: false }
      - label: Gallery
        name: gallery
        widget: list
        required: false
        field: { label: Image, name: image, widget: image }
      - { label: Excerpt, name: excerpt, widget: text }
      - label: Card
        name: card
        widget: object
        collapsed: false
        hint: "Listing card on Side quest and All blogs. Leave a field blank to fall back to the post."
        fields:
          - { label: Image, name: image, widget: image, required: false, hint: "Falls back to Cover Image." }
          - { label: Title, name: title, widget: string, required: false, hint: "Falls back to Title." }
          - { label: Excerpt, name: excerpt, widget: text, required: false, hint: "Falls back to Excerpt." }
          - { label: Label, name: label, widget: string, required: false, hint: "Small kicker such as Travel. Falls back to the first tag." }
      - label: Tags
        name: tags
        widget: list
        required: false
        hint: "Add an item named showcase to feature this post on Side quest (up to 3)."
        field: { label: Tag, name: tag, widget: string }
      - { label: Showcase, name: showcase, widget: boolean, default: false, hint: "Also features the post on Side quest." }
      - { label: Body, name: body, widget: markdown }
      - { label: Published, name: published, widget: boolean, default: false }
`;
  return new Response(yaml, {
    headers: {
      "content-type": "text/yaml; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function oauthStart(url, env) {
  const clientId = env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new Response(
      "GitHub OAuth is not configured. Set GITHUB_OAUTH_CLIENT_ID and GITHUB_OAUTH_CLIENT_SECRET on the Worker.",
      { status: 500, headers: { "content-type": "text/plain; charset=utf-8" } }
    );
  }

  const state = crypto.randomUUID();
  const authorize = new URL(GH_AUTHORIZE);
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("scope", "public_repo,user");
  authorize.searchParams.set("redirect_uri", `${url.origin}/callback`);
  authorize.searchParams.set("state", state);

  const html = `<!DOCTYPE html>
<html lang="en">
  <head><meta charset="utf-8" /><title>Signing in</title></head>
  <body>
    <p>Connecting to GitHub…</p>
    <script>
      (function () {
        var github = ${JSON.stringify(authorize.toString())};
        var origin = ${JSON.stringify(url.origin)};
        function go() { window.location = github; }
        window.addEventListener("message", function (e) {
          if (e.origin === origin && e.data === "authorizing:github") go();
        });
        if (window.opener) {
          window.opener.postMessage("authorizing:github", origin);
        } else {
          go();
        }
      })();
    </script>
  </body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "Set-Cookie": `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}

async function oauthCallback(request, url, env) {
  const clientId = env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return oauthPopup(url.origin, "error", "OAuth secrets are missing on the Worker.");
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookie = parseCookie(request.headers.get("Cookie") || "").oauth_state;
  if (!code || !state || !cookie || cookie !== state) {
    return oauthPopup(url.origin, "error", "OAuth state mismatch. Close this window and try Login again.");
  }

  const tokenRes = await fetch(GH_TOKEN, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: `${url.origin}/callback`,
    }),
  });
  const payload = await tokenRes.json();
  if (!payload.access_token) {
    return oauthPopup(
      url.origin,
      "error",
      payload.error_description || payload.error || "GitHub did not return a token."
    );
  }

  return oauthPopup(url.origin, "success", "", payload.access_token);
}

function oauthPopup(origin, status, message, token) {
  const payload =
    status === "success"
      ? `authorization:github:success:${JSON.stringify({ token, provider: "github" })}`
      : `authorization:github:error:${JSON.stringify({ message })}`;
  const html = `<!DOCTYPE html>
<html lang="en">
  <head><meta charset="utf-8" /><title>Decap CMS login</title></head>
  <body>
    <p>${status === "success" ? "Signed in. You can close this window." : escapeHtml(message)}</p>
    <script>
      (function () {
        var msg = ${JSON.stringify(payload)};
        var origin = ${JSON.stringify(origin)};
        if (window.opener) window.opener.postMessage(msg, origin);
      })();
    </script>
  </body>
</html>`;
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "Set-Cookie": "oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
    },
  });
}

function parseCookie(header) {
  const out = {};
  header.split(";").forEach((part) => {
    const idx = part.indexOf("=");
    if (idx === -1) return;
    out[part.slice(0, idx).trim()] = part.slice(idx + 1).trim();
  });
  return out;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

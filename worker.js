const GH_AUTHORIZE = "https://github.com/login/oauth/authorize";
const GH_TOKEN = "https://github.com/login/oauth/access_token";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/oauth") return oauthStart(url, env);
    if (url.pathname === "/callback") return oauthCallback(request, url, env);
    return env.ASSETS.fetch(request);
  },
};

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

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
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
    return oauthPopup(url.origin, "error", payload.error_description || payload.error || "GitHub did not return a token.");
  }

  return oauthPopup(url.origin, "success", "", payload.access_token);
}

function oauthPopup(origin, status, message, token) {
  const payload =
    status === "success"
      ? `authorization:github:success:${JSON.stringify({ token, provider: "github" })}`
      : `authorization:github:error:${message}`;
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

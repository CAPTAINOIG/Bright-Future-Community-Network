import { Context } from "https://edge.netlify.com";

const API_BASE = "https://bright-future-community-network-backend-3.onrender.com/api";
const SITE_URL = "https://bfcn.netlify.app";
const SITE_NAME = "BFCN News";
const FALLBACK_IMAGE = `${SITE_URL}/bfcn-logo.png`;

// Social‑media / SEO crawlers that need OG meta
const BOT_UA = /facebookexternalhit|Facebot|Twitterbot|WhatsApp|LinkedInBot|Slackbot|TelegramBot|Discordbot|Pinterest|Applebot|Googlebot/i;

export default async function handler(request, context) {
  const ua = request.headers.get("user-agent") || "";

  // Only intercept for bots — normal users get the SPA
  if (!BOT_UA.test(ua)) {
    return context.next();
  }

  const url = new URL(request.url);
  const match = url.pathname.match(/^\/news\/([^/]+)\/?$/);

  if (!match) {
    return context.next();
  }

  const slug = match[1];

  try {
    const apiRes = await fetch(`${API_BASE}/news/${slug}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (!apiRes.ok) {
      return context.next();
    }

    const json = await apiRes.json();
    const article = json?.data?.news ?? json?.data ?? null;

    if (!article) {
      return context.next();
    }

    const title = escapeHtml(article.title || "BFCN News");
    const description = escapeHtml(
      (article.summary || article.content || "Read this story on BFCN News").slice(0, 300)
    );
    const image = article.imageUrl || article.image || FALLBACK_IMAGE;
    const articleUrl = `${SITE_URL}/news/${slug}`;
    const publishedAt = article.publishedAt || "";
    const author = escapeHtml(article.author || article.sourceName || "BFCN News");
    const category = escapeHtml(article.category || "News");

    const html = `<!DOCTYPE html>
<html lang="en" prefix="og: https://ogp.me/ns# article: https://ogp.me/ns/article#">
<head>
  <meta charset="utf-8"/>
  <title>${title} — ${SITE_NAME}</title>

  <!-- Open Graph -->
  <meta property="og:type"        content="article"/>
  <meta property="og:site_name"   content="${SITE_NAME}"/>
  <meta property="og:title"       content="${title}"/>
  <meta property="og:description" content="${description}"/>
  <meta property="og:image"       content="${image}"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:url"         content="${articleUrl}"/>
  ${publishedAt ? `<meta property="article:published_time" content="${publishedAt}"/>` : ""}
  <meta property="article:section" content="${category}"/>
  <meta property="article:author"  content="${author}"/>

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image"/>
  <meta name="twitter:title"       content="${title}"/>
  <meta name="twitter:description" content="${description}"/>
  <meta name="twitter:image"       content="${image}"/>

  <!-- Standard meta -->
  <meta name="description" content="${description}"/>
  <link rel="canonical" href="${articleUrl}"/>

  <!-- Redirect real browsers that somehow land here -->
  <meta http-equiv="refresh" content="0;url=${articleUrl}"/>
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <p><a href="${articleUrl}">Read on ${SITE_NAME}</a></p>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  } catch (err) {
    // If API fetch fails, let the SPA handle it
    return context.next();
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export const config = {
  path: "/news/*",
};

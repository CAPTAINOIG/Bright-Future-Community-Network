// Netlify Edge Function: serves article-specific Open Graph tags on /news/:slug
// so links shared on WhatsApp, Facebook, X, Telegram, etc. show a rich preview
// (image + title + description). The SPA can't do this itself because link
// preview crawlers don't run JavaScript.
//
// Note: no imports here on purpose — `Context` from edge.netlify.com is a
// TypeScript type only, and importing it in plain JS breaks the deploy.

const API_BASE = "https://bright-future-community-network-backend-3.onrender.com/api";
const SITE_URL = "https://bfcn.netlify.app";
const SITE_NAME = "BFCN News";
const FALLBACK_IMAGE = `${SITE_URL}/bfcn-logo.png`;

// Link-preview / SEO crawlers that need server-rendered meta tags
const BOT_UA =
  /facebookexternalhit|facebookcatalog|meta-externalagent|Facebot|Twitterbot|WhatsApp|LinkedInBot|Slackbot|TelegramBot|Discordbot|Pinterest|Applebot|Googlebot|bingbot|Google-InspectionTool|SkypeUriPreview|redditbot|Embedly|Iframely|Viber|vkShare|Signal|Snapchat|Mastodon|Bluesky|Cardyb/i;

export default async function handler(request, context) {
  const ua = request.headers.get("user-agent") || "";

  // Real visitors get the normal SPA
  if (!BOT_UA.test(ua)) return context.next();

  const url = new URL(request.url);
  const match = url.pathname.match(/^\/news\/([^/]+)\/?$/);
  if (!match) return context.next();

  const slug = decodeURIComponent(match[1]);
  const articleUrl = `${SITE_URL}/news/${encodeURIComponent(slug)}`;

  let article = null;
  try {
    const apiRes = await fetch(`${API_BASE}/news/${encodeURIComponent(slug)}`, {
      headers: { Accept: "application/json" },
      // Render free tier can cold-start slowly; crawlers usually wait ~10s
      signal: AbortSignal.timeout(9000),
    });
    if (apiRes.ok) {
      const json = await apiRes.json();
      article = json?.data?.news ?? json?.data ?? null;
    }
  } catch {
    // fall through to a generic preview below
  }

  const title = article?.title || "Bright Future Community Network";
  const description = truncate(
    stripHtml(article?.summary || article?.content || "Read this story on BFCN News"),
    200
  );
  const image = absoluteImage(article?.imageUrl || article?.image);
  const publishedAt = article?.publishedAt || "";
  const author = article?.author || article?.sourceName || SITE_NAME;
  const category = article?.category || "News";

  const e = escapeHtml;
  const tags = `
    <title>${e(title)} — ${SITE_NAME}</title>
    <meta name="description" content="${e(description)}"/>
    <link rel="canonical" href="${e(articleUrl)}"/>
    <meta property="og:type" content="${article ? "article" : "website"}"/>
    <meta property="og:site_name" content="${SITE_NAME}"/>
    <meta property="og:title" content="${e(title)}"/>
    <meta property="og:description" content="${e(description)}"/>
    <meta property="og:url" content="${e(articleUrl)}"/>
    <meta property="og:image" content="${e(image)}"/>
    <meta property="og:image:secure_url" content="${e(image)}"/>
    <meta property="og:image:alt" content="${e(title)}"/>
    ${publishedAt ? `<meta property="article:published_time" content="${e(publishedAt)}"/>` : ""}
    <meta property="article:section" content="${e(category)}"/>
    <meta property="article:author" content="${e(author)}"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="${e(title)}"/>
    <meta name="twitter:description" content="${e(description)}"/>
    <meta name="twitter:image" content="${e(image)}"/>
  `;

  // Serve the real app HTML (so in-app browsers like WhatsApp's still load the
  // SPA) with the default meta tags swapped for the article's.
  const res = await context.next();
  const type = res.headers.get("content-type") || "";
  if (!type.includes("text/html")) return res;

  const page = (await res.text())
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+(?:property|name)="(?:og:[^"]*|twitter:[^"]*|description)"[^>]*>\s*/gi, "")
    .replace(/<\/head>/i, `${tags}</head>`);

  const headers = new Headers(res.headers);
  headers.delete("content-length");
  headers.set("content-type", "text/html; charset=utf-8");
  headers.set("cache-control", article ? "public, max-age=600" : "no-store");

  return new Response(page, { status: 200, headers });
}

// WhatsApp/Facebook require an absolute https image URL
function absoluteImage(raw) {
  if (!raw || typeof raw !== "string") return FALLBACK_IMAGE;
  let src = raw.trim();
  if (!src) return FALLBACK_IMAGE;
  if (src.startsWith("//")) src = `https:${src}`;
  else if (src.startsWith("/")) src = `${SITE_URL}${src}`;
  else if (!/^https?:\/\//i.test(src)) return FALLBACK_IMAGE;
  return src.replace(/^http:\/\//i, "https://");
}

function stripHtml(str) {
  return String(str).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function truncate(str, max) {
  return str.length <= max ? str : `${str.slice(0, max - 1).trimEnd()}…`;
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

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = "https://www.jotarmarketing.com.br";
const BLOG_POSTS_FILE = path.resolve(__dirname, "../src/data/blogPosts.ts");
const SITEMAP_FILE = path.resolve(__dirname, "../public/sitemap.xml");

const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/praiagrande", priority: "0.9", changefreq: "weekly" },
  { path: "/santos", priority: "0.9", changefreq: "weekly" },
  { path: "/saovicente", priority: "0.9", changefreq: "weekly" },
  { path: "/cubatao", priority: "0.9", changefreq: "weekly" },
  { path: "/guaruja", priority: "0.9", changefreq: "weekly" },
  { path: "/bertioga", priority: "0.9", changefreq: "weekly" },
  { path: "/orcamento", priority: "0.8", changefreq: "weekly" },
  { path: "/sobre", priority: "0.8", changefreq: "monthly" },
  { path: "/contato", priority: "0.8", changefreq: "monthly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
];

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

async function readBlogSlugs() {
  const source = await fs.readFile(BLOG_POSTS_FILE, "utf8");
  const slugRegex = /slug:\s*'([^']+)'/g;
  const slugs = new Set();

  for (const match of source.matchAll(slugRegex)) {
    slugs.add(match[1]);
  }

  return [...slugs];
}

function buildUrlEntry({ loc, lastmod, priority, changefreq }) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <priority>${priority}</priority>`,
    `    <changefreq>${changefreq}</changefreq>`,
    "  </url>",
  ].join("\n");
}

function buildSitemapXml(entries) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");
}

async function main() {
  const lastmod = getTodayDate();
  const blogSlugs = await readBlogSlugs();

  const staticEntries = STATIC_ROUTES.map((route) =>
    buildUrlEntry({
      loc: `${SITE_URL}${route.path}`,
      lastmod,
      priority: route.priority,
      changefreq: route.changefreq,
    })
  );

  const blogEntries = blogSlugs.map((slug) =>
    buildUrlEntry({
      loc: `${SITE_URL}/blog/${slug}`,
      lastmod,
      priority: "0.7",
      changefreq: "monthly",
    })
  );

  const xml = buildSitemapXml([...staticEntries, ...blogEntries]);
  await fs.writeFile(SITEMAP_FILE, xml, "utf8");

  console.log(`Sitemap gerado com ${STATIC_ROUTES.length + blogSlugs.length} URLs em ${SITEMAP_FILE}`);
}

main().catch((error) => {
  console.error("Falha ao gerar sitemap:", error);
  process.exitCode = 1;
});

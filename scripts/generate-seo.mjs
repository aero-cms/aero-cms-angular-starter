#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');

const apiUrl = (process.env.CMS_API_URL ?? process.env.PUBLIC_CMS_API_URL ?? 'http://localhost:5047').replace(/\/$/, '');
const siteUrl = (process.env.PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

const staticPaths = ['', '/haberler', '/etkinlikler', '/dokumanlar', '/iletisim', '/arama'];

function xmlEscape(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function fetchSitemapEntries() {
  const siteHeaders = {};
  const slug = process.env.CMS_SITE_SLUG;
  if (slug) siteHeaders['X-Site-Slug'] = slug;

  const urls = staticPaths.map((path) => ({
    loc: `${siteUrl}${path}`,
    priority: path === '' ? 1 : 0.7,
  }));

  try {
    const res = await fetch(`${apiUrl}/api/v1/content/sitemap`, { headers: siteHeaders });
    if (!res.ok) return urls;
    const json = await res.json();
    const pages = json.data ?? [];
    for (const item of pages) {
      const path = item.url.startsWith('/') ? item.url : `/${item.url}`;
      urls.push({
        loc: `${siteUrl}${path}`,
        lastmod: item.lastmod,
        priority: item.priority ?? 0.8,
      });
    }
  } catch {
    // static entries only
  }

  return urls;
}

const urls = await fetchSitemapEntries();
const body = urls
  .map((entry) => {
    const lastmod = entry.lastmod ? `<lastmod>${xmlEscape(entry.lastmod)}</lastmod>` : '';
    const priority = entry.priority != null ? `<priority>${entry.priority}</priority>` : '';
    return `<url><loc>${xmlEscape(entry.loc)}</loc>${lastmod}${priority}</url>`;
  })
  .join('');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
const robots = `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

await mkdir(publicDir, { recursive: true });
await writeFile(join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(join(publicDir, 'robots.txt'), robots, 'utf8');

console.log('Generated public/sitemap.xml and public/robots.txt');

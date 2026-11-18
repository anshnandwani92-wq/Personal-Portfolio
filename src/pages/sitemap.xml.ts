import type { APIRoute } from 'astro';
export const prerender = true;
const routes = ['', '/services', '/services/ai-automation', '/services/data-crm', '/services/martech-data-audit', '/services/web-personalization', '/who-i-help', '/work', '/insights', '/about', '/contact', '/privacy', '/thank-you'];
export const GET: APIRoute = ({ site }) => {
  const urls = routes.map((route) => `<url><loc>${new URL(route, site)}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

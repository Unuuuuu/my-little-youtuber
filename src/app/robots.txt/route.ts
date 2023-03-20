export async function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: https://www.mylittleyoutuber.com/sitemap.xml`);
}

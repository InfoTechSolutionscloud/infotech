import dbConnect from '../lib/mongoose';
import Blog from '../models/Blog';
import Ourservices from '../models/Ourservices';

export async function GET(req) {
  // Connect to the database
  await dbConnect();

  // Fetch services and blogs using Mongoose models
  const services = await Ourservices.find({}).select('slug').lean();
  const blogs = await Blog.find({}).select('blog_slug').lean();

  // Base URL for your site
  const baseUrl = 'https://www.infotechsolutions.cloud'; // Replace with your production URL when deploying

  // Static URLs
  const staticUrls = [
    '/',
    '/contact',
    '/services',
    '/portfolio',
    '/blog',
    '/about',
    '/track-project',
    '/legal/privacy-policy',
    '/legal/terms',
    '/legal/return-policy',
  ];

  // Generate URLs array
  const urls = [
    {
      loc: baseUrl,
      lastmod: new Date().toISOString(),
      priority: 1.0,
    },
    ...staticUrls.map((url) => ({
      loc: `${baseUrl}${url}`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
    })),
  ];

  // Add dynamic service URLs
  services.forEach(service => {
    urls.push({
      loc: `${baseUrl}/services/${service.slug}`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
    });
  });

  // Add dynamic blog URLs
  blogs.forEach(blog => {
    urls.push({
      loc: `${baseUrl}/blog/${blog.blog_slug}`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
    });
  });

  // Generate XML content
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${urls
        .map(url => {
          return `<url>
          <loc>${url.loc}</loc>
          <lastmod>${url.lastmod}</lastmod>
          <priority>${url.priority}</priority>
        </url>`;
        })
        .join('')}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

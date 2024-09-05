export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/team/',
      },
      sitemap: 'https://infotechsolutions.cloud/sitemap.xml',
    }
  }
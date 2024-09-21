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
    }))
  ];
  
import { MetadataRoute } from 'next';
import { posts } from '@/lib/posts';

const baseUrl = 'https://voegele.dev';

// Only real, crawlable routes — Google ignores #fragment URLs. Google also
// ignores priority/changefreq and distrusts a lastmod that changes on every
// build, so only pages with a real date carry one.
export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = posts[0]?.date;

  return [
    { url: baseUrl },
    { url: `${baseUrl}/blog`, ...(latestPost && { lastModified: new Date(latestPost) }) },
    ...posts.map((p) => ({ url: `${baseUrl}/blog/${p.slug}`, lastModified: new Date(p.date) })),
    { url: `${baseUrl}/work/formulagod` },
    { url: `${baseUrl}/work/getmoneymap` },
    { url: `${baseUrl}/lab` },
  ];
}

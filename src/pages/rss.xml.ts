import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  const reviews = await getCollection('reviews');

  const items = [
    ...posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description || '',
      link: `/gitforked/posts/${post.slug}/`,
    })),
    ...reviews.map((review) => ({
      title: `[Review] ${review.data.title} (${review.data.rating}/5)`,
      pubDate: new Date(review.data.date),
      description: review.data.description || '',
      link: `/gitforked/reviews/${review.slug}/`,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'GIT FORKED',
    description: 'Nonsense and sense in equal measure. Reviews, essays, and yaps by Joy Aloysius.',
    site: context.site ? context.site.toString() : 'https://aloysiussundar.github.io/gitforked',
    items,
  });
}

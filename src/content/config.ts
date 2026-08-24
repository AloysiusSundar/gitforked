import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().or(z.string().transform((str) => new Date(str))),
    author: z.string().default('Joy Aloysius'),
    category: z.string().default('Essay'),
    type: z.string().optional(), // e.g. "REFLECTION", "ESSAY", "LOG"
    order: z.number().optional(), // Explicit display order (1, 2, 3...)
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    coverImage: z.string().optional(),
  }),
});

const reviewsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().or(z.string().transform((str) => new Date(str))),
    category: z.string().default('Film / TV'),
    type: z.string().optional(), // e.g. "ANALYSIS", "REVIEW"
    order: z.number().optional(), // Explicit display order (1, 2, 3...)
    rating: z.number().min(0).max(5).default(5),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    status: z.string().default('RECOMMENDED'),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date().or(z.string().transform((str) => new Date(str))).optional(),
    order: z.number().optional(), // Explicit display order (1, 2, 3...)
    url: z.string().optional(),
    github: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  posts: postsCollection,
  reviews: reviewsCollection,
  projects: projectsCollection,
};

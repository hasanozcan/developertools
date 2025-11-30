const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  toolCount: number;
}

export interface Tool {
  id: number;
  name: string;
  slug: string;
  shortDescription?: string;
  categorySlug: string;
  categoryName: string;
  isFeatured: boolean;
}

export interface ToolDetail extends Tool {
  longDescription?: string;
  keywords: string[];
  seo?: {
    title?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImageUrl?: string;
    canonicalUrl?: string;
    structuredData?: string;
  };
  faqs: { question: string; answer: string }[];
  relatedTools: Tool[];
}

// Categories API
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    next: { revalidate: 300 }, // Cache for 5 minutes
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const res = await fetch(`${API_BASE_URL}/categories/${slug}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  return res.json();
}

// Tools API
export async function getTools(): Promise<Tool[]> {
  const res = await fetch(`${API_BASE_URL}/tools`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error('Failed to fetch tools');
  return res.json();
}

export async function getToolBySlug(slug: string): Promise<ToolDetail | null> {
  const res = await fetch(`${API_BASE_URL}/tools/${slug}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getFeaturedTools(count: number = 10): Promise<Tool[]> {
  const res = await fetch(`${API_BASE_URL}/tools/featured?count=${count}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error('Failed to fetch featured tools');
  return res.json();
}

export async function getPopularTools(count: number = 10): Promise<Tool[]> {
  const res = await fetch(`${API_BASE_URL}/tools/popular?count=${count}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error('Failed to fetch popular tools');
  return res.json();
}

// Analytics API
export async function trackToolUsage(toolSlug: string, sessionId?: string, referrer?: string): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toolSlug, sessionId, referrer }),
    });
  } catch {
    // Silently fail - don't break UX for analytics
  }
}

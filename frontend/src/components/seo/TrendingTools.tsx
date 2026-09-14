'use client';

import { useEffect, useMemo, useState } from 'react';
import { Flame } from 'lucide-react';
import Link from '@/components/common/LocalizedLink';
import { useLanguage } from '@/context/LanguageContext';
import { findCatalogTool } from '@/lib/api';
import { getLocalizedToolMeta } from '@/lib/i18nRouting';
import { getLocalTrendingToolSlugs, TOOL_USAGE_UPDATED_EVENT } from '@/lib/toolPopularity';
import { buildToolPath } from '@/lib/toolRoutes';

export default function TrendingTools() {
  const { language } = useLanguage();
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => setSlugs(getLocalTrendingToolSlugs(6));
    refresh();
    window.addEventListener(TOOL_USAGE_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(TOOL_USAGE_UPDATED_EVENT, refresh);
  }, []);

  const tools = useMemo(
    () => slugs.map((slug) => findCatalogTool(slug)).filter((tool) => Boolean(tool)),
    [slugs],
  );

  if (tools.length < 2) return null;

  return (
    <section className="mb-10" aria-labelledby="trending-for-you-heading">
      <div className="mb-4 flex items-center gap-2">
        <Flame className="h-5 w-5 text-amber-500" />
        <h2 id="trending-for-you-heading" className="text-xl font-bold text-slate-950 dark:text-white">Trending for you</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          if (!tool) return null;
          const meta = getLocalizedToolMeta(tool.slug, language, tool.name, tool.shortDescription || tool.name);
          return (
            <Link key={tool.slug} href={buildToolPath(tool.categorySlug, tool.slug)} className="interactive-card rounded-2xl p-4">
              <h3 className="text-sm font-semibold text-slate-950 dark:text-white">{meta.name}</h3>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{meta.description}</p>
            </Link>
          );
        })}
      </div>
      <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">Based only on tool opens stored on this device.</p>
    </section>
  );
}

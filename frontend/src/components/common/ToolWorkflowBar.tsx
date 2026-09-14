'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Copy, Check, GitBranch } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { buildToolPath } from '@/lib/toolRoutes';
import { getLocalizedPath } from '@/lib/i18nRouting';
import { getToolManifest, getWorkflowTargets } from '@/lib/toolManifest';
import {
  encodeTransferredInput,
  TOOL_OUTPUT_EVENT,
  type ToolOutputDetail,
} from '@/lib/toolWorkflow';

export default function ToolWorkflowBar({ toolSlug }: { toolSlug: string }) {
  const { language } = useLanguage();
  const [output, setOutput] = useState<ToolOutputDetail | null>(null);
  const [copied, setCopied] = useState(false);
  const manifest = getToolManifest(toolSlug);
  const targets = useMemo(() => getWorkflowTargets(toolSlug), [toolSlug]);

  useEffect(() => {
    setOutput(null);

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<ToolOutputDetail>).detail;
      if (detail?.toolSlug === toolSlug) setOutput(detail);
    };

    window.addEventListener(TOOL_OUTPUT_EVENT, handler);
    return () => window.removeEventListener(TOOL_OUTPUT_EVENT, handler);
  }, [toolSlug]);

  if (!manifest || targets.length === 0) return null;

  const buildHref = (targetSlug: string, category: string) => {
    const base = getLocalizedPath(buildToolPath(category, targetSlug), language);
    return output ? `${base}${encodeTransferredInput(output.value, output.dataType)}` : base;
  };

  const copyShareLink = async () => {
    if (!output || !manifest.shareable) return;
    const url = `${window.location.origin}${window.location.pathname}${encodeTransferredInput(output.value, output.dataType)}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mt-5 rounded-2xl border border-indigo-200/70 bg-indigo-50/60 p-3.5 dark:border-indigo-900/60 dark:bg-indigo-950/20">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <GitBranch className="h-3.5 w-3.5" />
          {output ? 'Send output to' : 'Continue workflow'}
        </span>
        {targets.map((target) => (
          <a
            key={target.slug}
            href={buildHref(target.slug, target.categorySlug)}
            className="inline-flex items-center gap-1 rounded-xl border border-indigo-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:border-indigo-400 hover:text-indigo-700 dark:border-indigo-900 dark:bg-slate-900 dark:text-slate-200"
          >
            {target.name}
            <ArrowRight className="h-3 w-3" />
          </a>
        ))}
        {output && manifest.shareable && (
          <button
            type="button"
            onClick={copyShareLink}
            className="ml-auto inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-950/50"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Share result'}
          </button>
        )}
      </div>
      {!output && (
        <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
          Run this tool first to transfer its result automatically to the next step.
        </p>
      )}
    </div>
  );
}

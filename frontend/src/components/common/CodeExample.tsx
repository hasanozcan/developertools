import CopyButton from '@/components/common/CopyButton';
import type { CodeExampleContent } from '@/lib/toolSeoContent';

export default function CodeExample({ title, language, code }: CodeExampleContent) {
  return (
    <figure
      className="min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-300 bg-slate-950 shadow-sm dark:border-slate-800"
      data-code-example="true"
    >
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900 px-3.5 py-2.5">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="inline-flex shrink-0 items-center rounded border border-slate-700 bg-slate-800 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
            {language}
          </span>
          <span className="min-w-0 break-words font-mono text-xs font-semibold text-slate-100 sm:text-sm">
            {title}
          </span>
        </div>
        <CopyButton
          text={code}
          className="shrink-0 !rounded-lg !border !border-slate-700 !bg-slate-800 !px-2.5 !py-1 font-mono !text-xs !text-slate-100 hover:!bg-slate-700"
        />
      </figcaption>
      <pre
        className="w-full max-w-full overflow-x-auto bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100 sm:text-sm"
        tabIndex={0}
        aria-label={`${title} code`}
      >
        <code>{code}</code>
      </pre>
    </figure>
  );
}

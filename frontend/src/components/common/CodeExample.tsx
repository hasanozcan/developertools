import CopyButton from '@/components/common/CopyButton';
import type { CodeExampleContent } from '@/lib/toolSeoContent';

export default function CodeExample({ title, language, code }: CodeExampleContent) {
  return (
    <figure
      className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700"
      data-code-example="true"
    >
      <figcaption className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 px-4 py-3 dark:bg-slate-800">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          {title}{' '}
          <span className="font-normal text-slate-600 dark:text-slate-300">· {language}</span>
        </span>
        <CopyButton text={code} />
      </figcaption>
      <pre
        className="overflow-x-auto bg-slate-950 p-4 text-sm leading-6 text-slate-100"
        tabIndex={0}
        aria-label={`${title} code`}
      >
        <code>{code}</code>
      </pre>
    </figure>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist. Browse free online developer tools instead.',
  robots: { index: false, follow: true },
};

const popularLinks = [
  { name: 'JSON Formatter', href: '/tools/json/json-formatter' },
  { name: 'Base64 Encoder/Decoder', href: '/tools/encoding/base64' },
  { name: 'UUID Generator', href: '/tools/generators/uuid-generator' },
  { name: 'Regex Tester', href: '/tools/text/regex-tester' },
  { name: 'Tool Collections', href: '/collections' },
  { name: 'Tools by Role', href: '/for' },
];

export default function NotFound() {
  return (
    <main className="page-shell py-10 sm:py-14">
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-white/80 bg-white/70 p-7 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:p-10">
        <span className="eyebrow mb-3">404</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600 dark:text-slate-300">
          The page you are looking for was moved, renamed, or never existed. Start from one of
          these popular destinations instead.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {popularLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-500/50 dark:hover:text-indigo-300"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-600 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-200"
        >
          Back to homepage
        </Link>
      </section>
    </main>
  );
}

'use client';

import { useEffect } from 'react';
import Link from '@/components/common/LocalizedLink';
import { useLanguage, type Language } from '@/context/LanguageContext';

interface ErrorCopy {
  badge: string;
  title: string;
  description: string;
  retry: string;
  home: string;
}

const ERROR_COPY: Record<Language, ErrorCopy> = {
  en: {
    badge: 'Error',
    title: 'Something went wrong',
    description:
      'An unexpected error occurred while rendering this page. You can try again or return to the home page.',
    retry: 'Try again',
    home: 'Back to Home',
  },
  tr: {
    badge: 'Hata',
    title: 'Bir şeyler ters gitti',
    description:
      'Bu sayfa oluşturulurken beklenmeyen bir hata oluştu. Yeniden deneyebilir veya ana sayfaya dönebilirsiniz.',
    retry: 'Tekrar dene',
    home: 'Ana Sayfaya Dön',
  },
  de: {
    badge: 'Fehler',
    title: 'Etwas ist schiefgelaufen',
    description:
      'Beim Laden dieser Seite ist ein unerwarteter Fehler aufgetreten. Sie können es erneut versuchen oder zur Startseite zurückkehren.',
    retry: 'Erneut versuchen',
    home: 'Zur Startseite',
  },
  es: {
    badge: 'Error',
    title: 'Algo salió mal',
    description:
      'Ocurrió un error inesperado al cargar esta página. Puedes intentarlo de nuevo o volver a la página principal.',
    retry: 'Intentar de nuevo',
    home: 'Volver al inicio',
  },
  fr: {
    badge: 'Erreur',
    title: 'Une erreur est survenue',
    description:
      'Une erreur inattendue s’est produite lors du chargement de cette page. Vous pouvez réessayer ou revenir à l’accueil.',
    retry: 'Réessayer',
    home: 'Retour à l’accueil',
  },
  ru: {
    badge: 'Ошибка',
    title: 'Что-то пошло не так',
    description:
      'При отображении этой страницы произошла непредвиденная ошибка. Вы можете попробовать снова или вернуться на главную страницу.',
    retry: 'Повторить',
    home: 'На главную',
  },
  zh: {
    badge: '错误',
    title: '出了点问题',
    description: '加载此页面时发生意外错误。您可以重试或返回首页。',
    retry: '重试',
    home: '返回首页',
  },
};

export default function ErrorBoundaryContent({
  error,
  reset,
}: {
  error: unknown;
  reset: () => void;
}) {
  const { language } = useLanguage();
  const copy = ERROR_COPY[language] ?? ERROR_COPY.en;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page-shell py-10 sm:py-14">
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-white/80 bg-white/70 p-7 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:p-10">
        <span className="eyebrow mb-3">{copy.badge}</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600 dark:text-slate-300">
          {copy.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-600 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-200"
          >
            {copy.retry}
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-500/50 dark:hover:text-indigo-300"
          >
            {copy.home}
          </Link>
        </div>
      </section>
    </div>
  );
}

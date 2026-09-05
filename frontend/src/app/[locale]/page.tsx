import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HomePageClient from '../page';
import {
  NON_DEFAULT_LOCALES,
  isNonDefaultLocale,
  getHreflangAlternates,
} from '@/lib/i18nRouting';
import type { Language } from '@/translations';

const titles: Record<Language, string> = {
  en: 'DevsTools – 366 Free, Privacy-First Developer Tools',
  tr: 'DevsTools – 366 Ücretsiz, Gizlilik Odaklı Geliştirici Araçları',
  de: 'DevsTools – 366 kostenlose, datenschutzfreundliche Entwickler-Tools',
  es: 'DevsTools – 366 herramientas gratuitas y privadas para desarrolladores',
  fr: 'DevsTools – 366 outils gratuits et respectueux de la vie privée pour développeurs',
  ru: 'DevsTools – 366 бесплатных инструментов для разработчиков',
  zh: 'DevsTools – 366 款免费且注重隐私的在线开发者工具',
};

const descriptions: Record<Language, string> = {
  en: 'Fast, free, privacy-first online developer tools running 100% client-side in your browser. JSON formatters, encoders, converters, generators, and more.',
  tr: 'Tarayıcınızda %100 istemci tarafı çalışan hızlı, ücretsiz ve gizlilik odaklı geliştirici araçları. JSON formatlayıcı, dönüştürücüler, şifreleyiciler ve fazlası.',
  de: 'Schnelle, kostenlose und datenschutzfreundliche Online-Entwicklertools, die zu 100 % clientseitig ausgeführt werden. JSON-Formatierer, Konverter und mehr.',
  es: 'Herramientas de desarrollo rápidas, gratuitas y privadas que se ejecutan 100% en el navegador. Formateadores JSON, codificadores, convertidores y más.',
  fr: 'Outils en ligne rapides, gratuits et privés pour développeurs s’exécutant à 100 % côté client. Formateurs JSON, convertisseurs, encodeurs et plus.',
  ru: 'Быстрые, бесплатные и конфиденциальные онлайн-инструменты для разработчиков, работающие на 100% в браузере. JSON-форматеры, конвертеры и многое другое.',
  zh: '在浏览器本地 100% 运行的快速、免费、注重隐私的在线开发者工具套件。包含 JSON 格式化、编码转换、代码生成等 366 款实用工具。',
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isNonDefaultLocale(locale)) {
    return { title: 'Not Found' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const canonicalUrl = `${siteUrl}/${locale}`;
  const title = titles[locale as Language] || titles.en;
  const description = descriptions[locale as Language] || descriptions.en;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: getHreflangAlternates('/', siteUrl),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'DevsTools',
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/og-image.png`],
    },
  };
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isNonDefaultLocale(locale)) {
    notFound();
  }

  return <HomePageClient />;
}

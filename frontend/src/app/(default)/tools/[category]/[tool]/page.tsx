import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import ToolPageWrapper from '@/components/tools/ToolPageWrapper';
import ToolRenderer from '@/components/tools/ToolRenderer';
import { categoryCatalog, findCatalogTool, getToolBySlug, toolCatalog } from '@/lib/api';
import { buildToolPath, getCanonicalToolCategory } from '@/lib/toolRoutes';
import { getToolSources } from '@/lib/toolSources';
import { getToolHreflangAlternates } from '@/lib/i18nRouting';
import { getLocalizedPath, getLocalizedToolMeta, type Language } from '@/lib/i18nRouting';
import { getWorkflowTargets } from '@/lib/toolManifest';
import { getCollectionsForTool, getLocalizedCollection } from '@/lib/toolCollections';
import { localizeToolPageCopy } from '@/lib/localizedToolPageCopy';
import {
  buildSupplementalToolFaqs,
  buildSupplementalToolSections,
  mergeToolFaqs,
  removeTemplatedDefinitionFaq,
} from '@/lib/toolSeoContent';
import { getToolSeoCopy } from '@/lib/toolSeoCopy';
import { serializeJsonForHtmlScript } from '@/lib/scriptSafeJson';
import { translations } from '@/translations';
import { toolPageContent as tools } from '@/lib/toolPageContent';
import { resolveToolTitle } from '@/lib/toolTitle';
import { getDeveloperGuidesForTool } from '@/lib/developerGuides';

function assertToolPageCatalogIntegrity(): void {
  const configuredRoutes = new Set<string>();
  const invalidRoutes: string[] = [];

  for (const [category, categoryTools] of Object.entries(tools)) {
    for (const toolSlug of Object.keys(categoryTools)) {
      configuredRoutes.add(`${category}/${toolSlug}`);
      const catalogTool = findCatalogTool(toolSlug);
      const canonicalCategory = getCanonicalToolCategory(toolSlug, category);

      if (!catalogTool || catalogTool.categorySlug !== canonicalCategory) {
        invalidRoutes.push(`${category}/${toolSlug}`);
      }
    }
  }

  const canonicalRoutes = new Set(toolCatalog.map((tool) => `${tool.categorySlug}/${tool.slug}`));
  const missingRoutes = [...canonicalRoutes].filter((route) => !configuredRoutes.has(route));

  if (missingRoutes.length || invalidRoutes.length) {
    throw new Error(
      `Tool page catalog mismatch. Missing: ${missingRoutes.join(', ') || 'none'}. Invalid: ${invalidRoutes.join(', ') || 'none'}.`,
    );
  }
}

assertToolPageCatalogIntegrity();

interface PageProps {
  params: Promise<{ category: string; tool: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, tool: toolSlug } = await params;
  const categoryTools = tools[category];
  const tool = categoryTools?.[toolSlug];

  if (!tool) {
    return { title: 'Tool Not Found' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const canonicalCategory = getCanonicalToolCategory(toolSlug, category);
  const canonicalUrl = `${siteUrl}/tools/${canonicalCategory}/${toolSlug}`;
  // Final <title> is kept <= 60 chars: the site suffix is dropped (absolute
  // title) when it would not fit. See src/lib/toolTitle.ts.
  const resolvedTitle = resolveToolTitle(tool);
  const metaTitle = resolvedTitle.socialTitle;
  const ogImageUrl = `${canonicalUrl}/opengraph-image`;

  return {
    title: resolvedTitle.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: getToolHreflangAlternates(toolSlug, canonicalCategory, siteUrl),
    },
    openGraph: {
      title: metaTitle,
      description: tool.description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'DevsTools',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: tool.description,
      images: [ogImageUrl],
    },
  };
}

export async function generateStaticParams() {
  return toolCatalog.map((tool) => ({
    category: tool.categorySlug,
    tool: tool.slug,
  }));
}

const categoryNames = Object.fromEntries(
  categoryCatalog.map((category) => [category.slug, category.name]),
) as Record<string, string>;

export default async function ToolPage({
  params,
  locale = 'en',
}: PageProps & { locale?: Language }) {
  const { category, tool: toolSlug } = await params;
  const categoryTools = tools[category];
  const tool = categoryTools?.[toolSlug];

  if (!tool) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const canonicalCategory = getCanonicalToolCategory(toolSlug, category);

  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  if (category !== canonicalCategory) {
    permanentRedirect(`${localePrefix}/tools/${canonicalCategory}/${toolSlug}`);
  }

  const canonicalUrl = `${siteUrl}${localePrefix}/tools/${canonicalCategory}/${toolSlug}`;
  // The Open Graph image route only exists under the unprefixed tool path.
  const ogImageUrl = `${siteUrl}/tools/${canonicalCategory}/${toolSlug}/opengraph-image`;
  const seoCopy = getToolSeoCopy(locale);
  const localeTranslations = translations[locale] ?? translations.en;
  // The client dictionary omits page descriptions. Pass only these approved
  // English introductions from the winning server dictionary; SEO metadata stays separate.
  const englishIntroduction =
    locale === 'en' &&
    ['curl-to-fetch', 'sha256-hash', 'file-checksum-comparator'].includes(toolSlug)
      ? {
          name: localeTranslations[`toolName.${toolSlug}`],
          description: localeTranslations[`toolDesc.${toolSlug}`],
        }
      : undefined;
  const homeName = locale === 'en' ? 'Home' : localeTranslations['nav.home'] || 'Home';
  const categoryName =
    locale === 'en'
      ? categoryNames[category] || category
      : localeTranslations[`cat.${canonicalCategory}`] || categoryNames[category] || category;
  const toAbsoluteLocalizedUrl = (path: string) => `${siteUrl}${getLocalizedPath(path, locale)}`;
  const sources = getToolSources(toolSlug).filter(
    (source) =>
      source.url !== canonicalUrl &&
      source.url !== `${siteUrl}/tools/${canonicalCategory}/${toolSlug}`,
  );
  const toolDetail = await getToolBySlug(toolSlug);
  const localizedTool = getLocalizedToolMeta(toolSlug, locale, tool.name, tool.description);
  const relatedCandidates = [...getWorkflowTargets(toolSlug), ...(toolDetail?.relatedTools || [])];
  const relatedBySlug = new Map<string, (typeof relatedCandidates)[number]>();
  for (const relatedTool of relatedCandidates) {
    if (relatedTool.slug !== toolSlug && !relatedBySlug.has(relatedTool.slug)) {
      relatedBySlug.set(relatedTool.slug, relatedTool);
    }
  }
  const relatedTools = [...relatedBySlug.values()].slice(0, 6).map((relatedTool) => {
    const localizedRelated = getLocalizedToolMeta(
      relatedTool.slug,
      locale,
      relatedTool.name,
      relatedTool.shortDescription || relatedTool.name,
    );
    return {
      name: localizedRelated.name,
      description: localizedRelated.description,
      href: buildToolPath(relatedTool.categorySlug, relatedTool.slug),
    };
  });
  const topicCollections = getCollectionsForTool(toolSlug)
    .slice(0, 3)
    .map((collection) => {
      const localizedCollection = getLocalizedCollection(collection, locale);
      return {
        name: localizedCollection.shortTitle,
        description: localizedCollection.description,
        href: `/collections/${collection.slug}`,
      };
    });
  const localizedPageCopy = await localizeToolPageCopy({
    faqs: removeTemplatedDefinitionFaq(tool.faqs, tool.name, [tool.description, tool.longDescription]),
    answerSections: tool.answerSections,
  }, locale);
  const effectiveFaqs = mergeToolFaqs(
    localizedPageCopy.faqs,
    buildSupplementalToolFaqs(localizedTool.name, locale),
  );
  const effectiveAnswerSections = [
    ...(localizedPageCopy.answerSections || []),
    ...buildSupplementalToolSections(
      toolSlug,
      localizedTool.name,
      localizedTool.description,
      locale,
    ),
  ];
  // Tool-specific steps are English-only; localized pages use the translated
  // generic steps so the visible list and HowTo JSON-LD match the page language.
  const localizedGenericSteps =
    locale === 'en'
      ? undefined
      : localeTranslations['toolPage.howToUseSteps']
          ?.split('\n')
          .map((step) => step.replace(/^\d+\.\s*/, '').trim())
          .filter(Boolean);
  const effectiveHowToUseSteps =
    localizedGenericSteps && localizedGenericSteps.length > 0
      ? localizedGenericSteps
      : tool.howToUseSteps || [
          'Enter or paste representative input into the tool.',
          'Adjust the available options for the result you need.',
          'Run the tool, review the output, and copy or continue to a related workflow step.',
        ];

  // FAQ structured data for SEO
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: effectiveFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // BreadcrumbList structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeName,
        item: locale === 'en' ? siteUrl : toAbsoluteLocalizedUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryName,
        item: toAbsoluteLocalizedUrl(`/tools/${canonicalCategory}`),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: localizedTool.name,
      },
    ],
  };

  // WebApplication structured data
  const appStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${canonicalUrl}#application`,
    url: canonicalUrl,
    name: localizedTool.name,
    description: localizedTool.description,
    inLanguage: locale,
    image: ogImageUrl,
    screenshot: ogImageUrl,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    isAccessibleForFree: true,
    citation: sources.map((source: { url: string }) => source.url),
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'DevsTools',
      url: siteUrl,
      logo: `${siteUrl}/icon-1200.png`,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const relatedToolsStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: seoCopy.relatedToolsListName(localizedTool.name),
    itemListElement: relatedTools.map((relatedTool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: relatedTool.name,
      url: toAbsoluteLocalizedUrl(relatedTool.href),
    })),
  };

  const howToStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: seoCopy.howToName(localizedTool.name),
    description: localizedTool.description,
    inLanguage: locale,
    step: effectiveHowToUseSteps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: seoCopy.howToStepName(index + 1),
      text: step.replace(/^\d+\.\s*/, ''),
    })),
  };

  return (
    <div className="page-shell">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(breadcrumbStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(faqStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(appStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(relatedToolsStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(howToStructuredData) }}
      />

      <ToolPageWrapper
        toolSlug={toolSlug}
        category={category}
        categoryName={categoryNames[category] || category}
        defaultName={englishIntroduction?.name || localizedTool.name}
        defaultDescription={
          englishIntroduction?.description || localizedTool.description || tool.longDescription
        }
        // Same resolution as the <title>/JSON-LD: the client `t()` only reads the
        // translation dict, which can hold an English placeholder for tools
        // whose real translation lives in enhancedTools.
        localizedName={locale === 'en' ? undefined : localizedTool.name}
        localizedDescription={locale === 'en' ? undefined : localizedTool.description}
        faqs={effectiveFaqs}
        sources={sources}
        answerSections={effectiveAnswerSections}
        relatedTools={relatedTools}
        topicCollections={topicCollections}
        relatedGuides={getDeveloperGuidesForTool(toolSlug).map((guide) => ({
          name: guide.title,
          description: guide.description,
          href: `/guides/${guide.slug}`,
        }))}
        howToUseSteps={effectiveHowToUseSteps}
      >
        <ToolRenderer toolSlug={toolSlug} />
      </ToolPageWrapper>
    </div>
  );
}

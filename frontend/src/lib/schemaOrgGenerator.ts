export type SchemaType =
  | 'FAQPage'
  | 'Article'
  | 'Product'
  | 'LocalBusiness'
  | 'Organization'
  | 'Person'
  | 'BreadcrumbList'
  | 'HowTo';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export interface SchemaOrgInput {
  type: SchemaType;
  // FAQ
  faqs?: FAQItem[];
  // Article
  headline?: string;
  description?: string;
  authorName?: string;
  publisherName?: string;
  publisherLogo?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  // Product
  productName?: string;
  brand?: string;
  sku?: string;
  price?: string;
  priceCurrency?: string;
  availability?: string; // InStock, OutOfStock, PreOrder
  ratingValue?: string;
  reviewCount?: string;
  // LocalBusiness & Organization
  name?: string;
  url?: string;
  logo?: string;
  telephone?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  socialLinks?: string[];
  // Person
  jobTitle?: string;
  worksFor?: string;
  // Breadcrumbs
  breadcrumbs?: BreadcrumbItem[];
  // HowTo
  steps?: HowToStep[];
  totalTime?: string;
}

export function generateSchemaOrgJsonLd(input: SchemaOrgInput): object {
  const base: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': input.type,
  };

  switch (input.type) {
    case 'FAQPage': {
      base.mainEntity = (input.faqs || []).map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      }));
      break;
    }

    case 'Article': {
      if (input.headline) base.headline = input.headline;
      if (input.description) base.description = input.description;
      if (input.image) base.image = input.image;
      if (input.datePublished) base.datePublished = input.datePublished;
      if (input.dateModified) base.dateModified = input.dateModified;
      if (input.authorName) {
        base.author = {
          '@type': 'Person',
          name: input.authorName,
        };
      }
      if (input.publisherName) {
        base.publisher = {
          '@type': 'Organization',
          name: input.publisherName,
          ...(input.publisherLogo
            ? { logo: { '@type': 'ImageObject', url: input.publisherLogo } }
            : {}),
        };
      }
      break;
    }

    case 'Product': {
      if (input.productName) base.name = input.productName;
      if (input.description) base.description = input.description;
      if (input.image) base.image = input.image;
      if (input.sku) base.sku = input.sku;
      if (input.brand) {
        base.brand = {
          '@type': 'Brand',
          name: input.brand,
        };
      }
      if (input.price) {
        base.offers = {
          '@type': 'Offer',
          price: input.price,
          priceCurrency: input.priceCurrency || 'USD',
          availability: `https://schema.org/${input.availability || 'InStock'}`,
        };
      }
      if (input.ratingValue) {
        base.aggregateRating = {
          '@type': 'AggregateRating',
          ratingValue: input.ratingValue,
          reviewCount: input.reviewCount || '1',
        };
      }
      break;
    }

    case 'LocalBusiness':
    case 'Organization': {
      if (input.name) base.name = input.name;
      if (input.url) base.url = input.url;
      if (input.logo) base.logo = input.logo;
      if (input.telephone) base.telephone = input.telephone;
      if (input.address) {
        base.address = {
          '@type': 'PostalAddress',
          ...input.address,
        };
      }
      if (input.socialLinks && input.socialLinks.length > 0) {
        base.sameAs = input.socialLinks.filter((s) => Boolean(s.trim()));
      }
      break;
    }

    case 'Person': {
      if (input.name) base.name = input.name;
      if (input.url) base.url = input.url;
      if (input.jobTitle) base.jobTitle = input.jobTitle;
      if (input.worksFor) {
        base.worksFor = {
          '@type': 'Organization',
          name: input.worksFor,
        };
      }
      if (input.socialLinks && input.socialLinks.length > 0) {
        base.sameAs = input.socialLinks.filter((s) => Boolean(s.trim()));
      }
      break;
    }

    case 'BreadcrumbList': {
      base.itemListElement = (input.breadcrumbs || []).map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: crumb.url,
      }));
      break;
    }

    case 'HowTo': {
      if (input.name) base.name = input.name;
      if (input.description) base.description = input.description;
      if (input.totalTime) base.totalTime = input.totalTime;
      if (input.steps && input.steps.length > 0) {
        base.step = input.steps.map((step, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: step.name,
          text: step.text,
          ...(step.image ? { image: step.image } : {}),
        }));
      }
      break;
    }
  }

  return base;
}

export function formatSchemaOrgScript(schemaObj: object, indent = 2): string {
  const jsonString = JSON.stringify(schemaObj, null, indent);
  return `<script type="application/ld+json">\n${jsonString}\n</script>`;
}

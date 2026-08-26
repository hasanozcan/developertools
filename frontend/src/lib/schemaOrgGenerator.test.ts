import { describe, expect, it } from 'vitest';
import { generateSchemaOrgJsonLd, formatSchemaOrgScript } from './schemaOrgGenerator';

describe('schemaOrgGenerator', () => {
  it('generates valid FAQPage schema', () => {
    const schema = generateSchemaOrgJsonLd({
      type: 'FAQPage',
      faqs: [
        { question: 'What is DevsTools?', answer: 'A 100% client-side developer tools suite.' },
        { question: 'Is it free?', answer: 'Yes, completely free.' },
      ],
    }) as any;

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0].name).toBe('What is DevsTools?');
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe('A 100% client-side developer tools suite.');
  });

  it('generates valid Article schema', () => {
    const schema = generateSchemaOrgJsonLd({
      type: 'Article',
      headline: 'Next.js 16 Features',
      authorName: 'Jane Developer',
      publisherName: 'Tech Blog',
      datePublished: '2026-01-15',
    }) as any;

    expect(schema['@type']).toBe('Article');
    expect(schema.headline).toBe('Next.js 16 Features');
    expect(schema.author.name).toBe('Jane Developer');
    expect(schema.publisher.name).toBe('Tech Blog');
  });

  it('formats into script tag', () => {
    const schema = { '@context': 'https://schema.org', '@type': 'Person', name: 'Alice' };
    const script = formatSchemaOrgScript(schema);
    expect(script).toContain('<script type="application/ld+json">');
    expect(script).toContain('"@type": "Person"');
    expect(script).toContain('</script>');
  });
});

import { describe, expect, it } from 'vitest';
import type { Language } from '@/translations';
import {
  buildSupplementalToolFaqs,
  buildSupplementalToolSections,
  mergeToolFaqs,
  removeTemplatedDefinitionFaq,
} from './toolSeoContent';
import { toolSeoCopy } from './toolSeoCopy';

const locales = Object.keys(toolSeoCopy) as Language[];

describe('buildSupplementalToolFaqs', () => {
  it('keeps the existing English copy', () => {
    expect(buildSupplementalToolFaqs('JSON Formatter')).toEqual([
      {
        question: 'Do I need to install anything to use JSON Formatter?',
        answer:
          'No. The interactive developer tool runs in the browser, so you can use it without installing a CLI or desktop application.',
      },
      {
        question: 'What should I do with the result from JSON Formatter?',
        answer:
          'Review the generated or transformed output, then copy it into your code, configuration, request, test fixture, or a compatible next-step tool in the workflow.',
      },
    ]);
  });

  it('localizes the question and answer instead of mixing English with a localized name', () => {
    const [install, result] = buildSupplementalToolFaqs('JSON Biçimlendirici', 'tr');
    expect(install.question).toBe(
      'JSON Biçimlendirici aracını kullanmak için bir şey yüklemem gerekiyor mu?',
    );
    expect(install.answer).toMatch(/^Hayır\./);
    expect(result.question).toContain('JSON Biçimlendirici');
    expect(`${install.question} ${install.answer} ${result.question} ${result.answer}`).not.toMatch(
      /Do I need|What should I do|runs in the browser/,
    );
  });

  it.each(locales.filter((locale) => locale !== 'en'))('has distinct %s copy', (locale) => {
    const localized = buildSupplementalToolFaqs('Tool X', locale);
    const english = buildSupplementalToolFaqs('Tool X');
    localized.forEach((faq, index) => {
      expect(faq.question).toContain('Tool X');
      expect(faq.question).not.toBe(english[index].question);
      expect(faq.answer).not.toBe(english[index].answer);
    });
  });
});

describe('buildSupplementalToolSections', () => {
  it('keeps the existing English section', () => {
    const [section] = buildSupplementalToolSections(
      'json-formatter',
      'JSON Formatter',
      'Format JSON.',
    );
    expect(section.heading).toBe('Example workflow with JSON Formatter');
    expect(section.bullets?.[0]).toBe(
      'Start with json input that represents the real value you want to inspect, convert, or generate.',
    );
    expect(section.bullets?.[1]).toBe('Use JSON Formatter to format json.');
  });

  it('builds fully localized sections without English template text', () => {
    const [section] = buildSupplementalToolSections(
      'json-formatter',
      'JSON Formatter',
      'JSON verilerini biçimlendirin',
      'tr',
    );
    expect(section.heading).toBe('JSON Formatter ile örnek iş akışı');
    expect(section.bullets?.[0]).toContain('(JSON)');
    expect(section.bullets?.[1]).toBe(
      'Ardından JSON Formatter aracını kullanın: JSON verilerini biçimlendirin.',
    );
    const text = [section.heading, ...(section.paragraphs ?? []), ...(section.bullets ?? [])].join(
      ' ',
    );
    expect(text).not.toMatch(/\b(Start with|Review the|Use JSON Formatter to|Example workflow)\b/);
  });

  it('uses Chinese punctuation when completing a zh description', () => {
    const [section] = buildSupplementalToolSections(
      'json-formatter',
      'JSON 格式化',
      '格式化 JSON',
      'zh',
    );
    expect(section.bullets?.[1]).toBe('然后使用 JSON 格式化：格式化 JSON。');
  });
});

describe('removeTemplatedDefinitionFaq', () => {
  const description = 'Flatten deeply nested JSON objects into single-level dot notation keys.';

  it('drops the auto-generated "What is {name}?" FAQ that repeats the description', () => {
    const faqs = [
      { question: 'What is JSON Deep Object Flattener?', answer: description },
      {
        question: 'Is my data private?',
        answer: 'Yes, 100% client-side execution in your browser.',
      },
    ];
    expect(
      removeTemplatedDefinitionFaq(faqs, 'JSON Deep Object Flattener', [description, description]),
    ).toEqual([faqs[1]]);
  });

  it('keeps hand-written definition FAQs', () => {
    const faqs = [
      { question: 'What is JSON?', answer: 'JSON is a lightweight data interchange format.' },
      {
        question: 'What is JSON Formatter?',
        answer: 'A tool that pretty-prints and minifies JSON documents.',
      },
    ];
    expect(
      removeTemplatedDefinitionFaq(faqs, 'JSON Formatter', ['Format and validate JSON.']),
    ).toEqual(faqs);
  });
});

describe('mergeToolFaqs', () => {
  it('deduplicates by question and caps at six entries', () => {
    const existing = Array.from({ length: 5 }, (_, index) => ({
      question: `Q${index}`,
      answer: 'A',
    }));
    const merged = mergeToolFaqs(existing, [
      { question: 'q0', answer: 'duplicate' },
      { question: 'New', answer: 'B' },
      { question: 'Overflow', answer: 'C' },
    ]);
    expect(merged.map((faq) => faq.question)).toEqual(['Q0', 'Q1', 'Q2', 'Q3', 'Q4', 'New']);
  });
});

describe('toolSeoCopy', () => {
  it('covers every supported language', () => {
    expect(locales.sort()).toEqual(['de', 'en', 'es', 'fr', 'ru', 'tr', 'zh']);
  });
});

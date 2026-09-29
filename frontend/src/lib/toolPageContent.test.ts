import { describe, expect, it } from 'vitest';
import { toolPageContent } from './toolPageContent';

// High-search-volume tools that must ship substantial, unique page copy.
const HIGH_INTENT_TOOLS: ReadonlyArray<readonly [category: string, slug: string]> = [
  ['encoding', 'base64'],
  ['encoding', 'image-to-base64'],
  ['utilities', 'cron-parser'],
  ['formatters', 'sql-formatter'],
  ['formatters', 'js-minifier'],
  ['formatters', 'css-minifier'],
  ['json', 'json-to-typescript'],
  ['json', 'yaml-json'],
  ['json', 'json-csv'],
  ['json', 'json-validator'],
  ['generators', 'qr-code'],
  ['generators', 'lorem-ipsum'],
  ['converters', 'color-converter'],
  ['text', 'case-converter'],
  ['text', 'word-counter'],
  ['text', 'text-diff'],
];

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

describe('toolPageContent high-intent tool copy', () => {
  it.each(HIGH_INTENT_TOOLS)('%s/%s has substantial, well-formed copy', (category, slug) => {
    const tool = toolPageContent[category]?.[slug];
    expect(tool, `${category}/${slug} is missing`).toBeDefined();
    if (!tool) return;

    const sectionWords = (tool.answerSections ?? []).reduce(
      (total, section) =>
        total +
        [...(section.paragraphs ?? []), ...(section.bullets ?? [])].reduce(
          (sum, text) => sum + countWords(text),
          0,
        ),
      0,
    );
    expect(sectionWords).toBeGreaterThanOrEqual(250);

    expect(tool.faqs.length).toBeGreaterThanOrEqual(4);
    const templatedQuestion = `What is ${tool.name}?`.toLowerCase();
    const questions = tool.faqs.map((faq) => faq.question.trim().toLowerCase());
    expect(questions).not.toContain(templatedQuestion);
    expect(new Set(questions).size).toBe(questions.length);

    expect(tool.description.length).toBeGreaterThanOrEqual(120);
    expect(tool.description.length).toBeLessThanOrEqual(165);

    expect(tool.howToUseSteps?.length ?? 0).toBeGreaterThanOrEqual(3);
  });
});

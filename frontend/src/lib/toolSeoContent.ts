import { getToolManifest } from '@/lib/toolManifest';
import { getToolSeoCopy } from '@/lib/toolSeoCopy';
import type { Language } from '@/translations';

export interface CodeExampleContent {
  title: string;
  language: string;
  code: string;
}

export interface ToolSeoSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  codeExamples?: CodeExampleContent[];
}

export interface ToolFaq {
  question: string;
  answer: string;
}

function humanizeDataType(value: string) {
  return value.replaceAll('-', ' ');
}

export function buildSupplementalToolSections(
  toolSlug: string,
  toolName: string,
  description: string,
  locale: Language = 'en',
): ToolSeoSection[] {
  const copy = getToolSeoCopy(locale);
  const manifest = getToolManifest(toolSlug);
  const labelDataType = (value: string) => copy.dataTypeLabels[value] ?? humanizeDataType(value);
  const inputTypes = (manifest?.inputTypes ?? ['text']).map(labelDataType);
  const outputTypes = (manifest?.outputTypes ?? ['text']).map(labelDataType);
  const workflowTargets = manifest?.workflowTargets ?? [];

  const bullets = [
    copy.startBullet(inputTypes.join(copy.or)),
    copy.useBullet(toolName, description),
    copy.reviewBullet(outputTypes.join(copy.or)),
  ];

  if (workflowTargets.length > 0) {
    bullets.push(copy.continueBullet);
  }

  return [
    {
      heading: copy.exampleHeading(toolName),
      paragraphs: [copy.exampleParagraph(toolName)],
      bullets,
    },
  ];
}

export function buildSupplementalToolFaqs(toolName: string, locale: Language = 'en'): ToolFaq[] {
  const copy = getToolSeoCopy(locale);
  return [
    { question: copy.installQuestion(toolName), answer: copy.installAnswer },
    { question: copy.resultQuestion(toolName), answer: copy.resultAnswer },
  ];
}

function normalizeCopy(value: string) {
  return value.trim().replace(/\s+/g, ' ').toLowerCase();
}

/**
 * Drops the auto-generated "What is {tool name}?" FAQ whose answer merely
 * repeats the tool's meta description. Hand-written "What is …?" FAQs (for
 * example "What is JSON?") and ones with a distinct answer are kept.
 */
export function removeTemplatedDefinitionFaq(
  faqs: ToolFaq[],
  toolName: string,
  descriptions: string[],
): ToolFaq[] {
  const templatedQuestion = normalizeCopy(`What is ${toolName}?`);
  const repeatedAnswers = new Set(descriptions.filter(Boolean).map(normalizeCopy));
  return faqs.filter(
    (faq) =>
      !(
        normalizeCopy(faq.question) === templatedQuestion &&
        repeatedAnswers.has(normalizeCopy(faq.answer))
      ),
  );
}

export function mergeToolFaqs(existing: ToolFaq[], supplemental: ToolFaq[]): ToolFaq[] {
  const seen = new Set(existing.map((faq) => faq.question.trim().toLowerCase()));
  const merged = [...existing];
  for (const faq of supplemental) {
    const key = faq.question.trim().toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(faq);
    }
  }
  return merged.slice(0, 6);
}

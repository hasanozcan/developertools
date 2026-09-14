import { getToolManifest } from '@/lib/toolManifest';

export interface ToolSeoSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
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
): ToolSeoSection[] {
  const manifest = getToolManifest(toolSlug);
  const inputTypes = manifest?.inputTypes.map(humanizeDataType) ?? ['text'];
  const outputTypes = manifest?.outputTypes.map(humanizeDataType) ?? ['text'];
  const workflowTargets = manifest?.workflowTargets ?? [];

  const bullets = [
    `Start with ${inputTypes.join(' or ')} input that represents the real value you want to inspect, convert, or generate.`,
    `Use ${toolName} to ${description.replace(/\.$/, '').toLowerCase()}.`,
    `Review the ${outputTypes.join(' or ')} result before copying it into application code, configuration, documentation, or a test fixture.`,
  ];

  if (workflowTargets.length > 0) {
    bullets.push(
      `Continue the workflow with one of the suggested next-step tools; compatible output can be transferred directly when the current tool publishes a result.`,
    );
  }

  return [
    {
      heading: `Example workflow with ${toolName}`,
      paragraphs: [
        `A practical way to use ${toolName} is to begin with a small representative sample, verify the output, and then repeat the same workflow with production-sized input. This makes formatting, conversion, or validation problems easier to isolate before the result is reused elsewhere.`,
      ],
      bullets,
    },
  ];
}

export function buildSupplementalToolFaqs(toolName: string): ToolFaq[] {
  return [
    {
      question: `Do I need to install anything to use ${toolName}?`,
      answer:
        'No. The interactive developer tool runs in the browser, so you can use it without installing a CLI or desktop application.',
    },
    {
      question: `What should I do with the result from ${toolName}?`,
      answer:
        'Review the generated or transformed output, then copy it into your code, configuration, request, test fixture, or a compatible next-step tool in the workflow.',
    },
  ];
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

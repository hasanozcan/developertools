export interface SystemPromptSections {
  roleTitle: string;
  context: string;
  guidelines: string[];
  outputFormat: string;
  examples: { input: string; output: string }[];
}

export function generateStructuredSystemPrompt(sections: SystemPromptSections): string {
  const lines: string[] = [];

  if (sections.roleTitle.trim()) {
    lines.push(`# ROLE & OBJECTIVE\nYou are ${sections.roleTitle.trim()}.`);
  }

  if (sections.context.trim()) {
    lines.push(`\n# CONTEXT & DOMAIN KNOWLEDGE\n${sections.context.trim()}`);
  }

  if (sections.guidelines.length > 0 && sections.guidelines.some((g) => g.trim())) {
    lines.push('\n# INSTRUCTIONS & CONSTRAINTS');
    sections.guidelines
      .filter((g) => g.trim())
      .forEach((g) => lines.push(`- ${g.trim()}`));
  }

  if (sections.outputFormat.trim()) {
    lines.push(`\n# OUTPUT FORMAT\n${sections.outputFormat.trim()}`);
  }

  if (sections.examples.length > 0 && sections.examples.some((e) => e.input || e.output)) {
    lines.push('\n# EXAMPLES');
    sections.examples.forEach((ex, i) => {
      if (ex.input || ex.output) {
        lines.push(`\n<example id="${i + 1}">`);
        if (ex.input) lines.push(`USER: ${ex.input.trim()}`);
        if (ex.output) lines.push(`ASSISTANT: ${ex.output.trim()}`);
        lines.push('</example>');
      }
    });
  }

  return lines.join('\n').trim();
}

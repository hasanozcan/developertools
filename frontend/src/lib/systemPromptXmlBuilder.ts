export interface SystemPromptTemplate {
  role: string;
  context: string;
  instructions: string[];
  rules: string[];
  outputFormat: string;
  examples: { input: string; output: string }[];
}

export function buildXmlSystemPrompt(config: SystemPromptTemplate): string {
  const parts: string[] = ['<system_prompt>'];

  if (config.role) {
    parts.push('  <identity_and_role>\n    ' + config.role.trim() + '\n  </identity_and_role>');
  }

  if (config.context) {
    parts.push('  <context>\n    ' + config.context.trim() + '\n  </context>');
  }

  if (config.instructions && config.instructions.length > 0) {
    parts.push('  <task_instructions>');
    config.instructions.forEach((inst, idx) => {
      parts.push('    <step_' + (idx + 1) + '>' + inst.trim() + '</step_' + (idx + 1) + '>');
    });
    parts.push('  </task_instructions>');
  }

  if (config.rules && config.rules.length > 0) {
    parts.push('  <strict_rules>');
    config.rules.forEach((rule) => {
      parts.push('    <rule>' + rule.trim() + '</rule>');
    });
    parts.push('  </strict_rules>');
  }

  if (config.outputFormat) {
    parts.push('  <output_format>\n    ' + config.outputFormat.trim() + '\n  </output_format>');
  }

  if (config.examples && config.examples.length > 0) {
    parts.push('  <few_shot_examples>');
    config.examples.forEach((ex, idx) => {
      parts.push('    <example index="' + (idx + 1) + '">\n      <input>' + ex.input.trim() + '</input>\n      <output>' + ex.output.trim() + '</output>\n    </example>');
    });
    parts.push('  </few_shot_examples>');
  }

  parts.push('</system_prompt>');
  return parts.join('\n');
}

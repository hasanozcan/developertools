export function formatFewShotPrompt(task: string, examples: Array<{ input: string; output: string }>): string {
  const ex = examples.map((e, i) => 'Example ' + (i + 1) + ':\nInput: ' + e.input + '\nOutput: ' + e.output).join('\n\n');
  return 'Task: ' + task + '\n\n' + ex + '\n\nNow perform the task for the given input:\nInput: ';
}

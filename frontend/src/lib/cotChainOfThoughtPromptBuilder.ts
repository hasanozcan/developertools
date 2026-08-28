export function generateCotPrompt(goal: string): string {
  return 'You are an expert logical reasoner.\nGoal: ' + goal + '\n\nPlease follow these reasoning steps before providing the final answer:\n1. Analyze the core constraints and context.\n2. Break down the problem into sequential steps.\n3. Evaluate edge cases and assumptions.\n4. Conclude with a clear, concise solution in <answer></answer> tags.\n';
}

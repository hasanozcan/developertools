export interface UiDictionaryAnalysis {
  universe: string[];
  core: string[];
  tools: Record<string, string[]>;
  stats: Record<string, number>;
}
export function analyzeUiDictionaries(frontendRoot: string): UiDictionaryAnalysis;
export function renderSplitOutputs(frontendRoot: string): {
  outputs: Map<string, string>;
  analysis: UiDictionaryAnalysis;
};

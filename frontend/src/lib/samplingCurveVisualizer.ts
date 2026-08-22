export interface LogitDistribution {
  token: string;
  logit: number;
  rawProb: number;
  sampledProb: number;
  includedInTopP: boolean;
  includedInTopK: boolean;
}

export function computeSoftmaxWithTemperature(
  items: { token: string; logit: number }[],
  temperature: number,
  topP = 1.0,
  topK = 50,
): LogitDistribution[] {
  const temp = Math.max(0.01, temperature);

  // Softmax with temperature: exp(z_i / T) / sum(exp(z_j / T))
  const maxLogit = Math.max(...items.map((i) => i.logit));
  const scaledExps = items.map((i) => Math.exp((i.logit - maxLogit) / temp));
  const sumScaled = scaledExps.reduce((a, b) => a + b, 0);

  // Raw Softmax (T=1.0)
  const rawExps = items.map((i) => Math.exp(i.logit - maxLogit));
  const sumRaw = rawExps.reduce((a, b) => a + b, 0);

  const distributions: LogitDistribution[] = items.map((item, idx) => ({
    token: item.token,
    logit: item.logit,
    rawProb: rawExps[idx] / sumRaw,
    sampledProb: scaledExps[idx] / sumScaled,
    includedInTopP: false,
    includedInTopK: false,
  }));

  // Sort by sampledProb descending for Top-K / Top-P filtering
  distributions.sort((a, b) => b.sampledProb - a.sampledProb);

  let cumulativeP = 0;
  distributions.forEach((d, idx) => {
    d.includedInTopK = idx < topK;
    if (cumulativeP < topP) {
      d.includedInTopP = true;
      cumulativeP += d.sampledProb;
    }
  });

  return distributions;
}

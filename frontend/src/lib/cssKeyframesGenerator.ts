export interface KeyframeStep {
  percentage: number;
  properties: Record<string, string>;
}

export function generateKeyframesCss(
  animationName: string,
  steps: KeyframeStep[],
  options: {
    duration?: string;
    timingFunction?: string;
    iterationCount?: string;
  } = {},
): {
  keyframesCss: string;
  animationClassCss: string;
  fullCss: string;
} {
  const name = animationName.trim() || 'custom-animation';
  const {
    duration = '1s',
    timingFunction = 'ease-in-out',
    iterationCount = 'infinite',
  } = options;

  const sortedSteps = [...steps].sort((a, b) => a.percentage - b.percentage);

  const stepsStr = sortedSteps
    .map((step) => {
      const propsStr = Object.entries(step.properties)
        .map(([k, v]) => `    ${k}: ${v};`)
        .join('\n');
      return `  ${step.percentage}% {\n${propsStr}\n  }`;
    })
    .join('\n\n');

  const keyframesCss = `@keyframes ${name} {\n${stepsStr}\n}`;
  const animationClassCss = `.${name} {\n  animation: ${name} ${duration} ${timingFunction} ${iterationCount};\n}`;
  const fullCss = `${keyframesCss}\n\n${animationClassCss}`;

  return {
    keyframesCss,
    animationClassCss,
    fullCss,
  };
}

export interface KeyframeStep {
  percentage: number;
  properties: Record<string, string>;
}

const CSS_IDENTIFIER_RE = /^[a-zA-Z_-][a-zA-Z0-9_-]*$/;
const CSS_DURATION_RE = /^\d+(\.\d+)?(s|ms)$/;
const CSS_BREAKOUT_RE = /[<>{};\r\n]/;
const CSS_UNSAFE_VALUE_RE = /[<>{};\r\n]|<\/|expression\s*\(|javascript\s*:/i;

export function sanitizeAnimationName(animationName: string): string {
  const trimmed = animationName.trim();
  if (!trimmed || CSS_BREAKOUT_RE.test(trimmed) || !CSS_IDENTIFIER_RE.test(trimmed)) {
    return 'customAnimation';
  }
  return trimmed;
}

export function sanitizeAnimationDuration(duration?: string): string {
  const trimmed = (duration ?? '').trim();
  if (!trimmed || CSS_BREAKOUT_RE.test(trimmed) || !CSS_DURATION_RE.test(trimmed)) {
    return '1s';
  }
  return trimmed;
}

function sanitizeTimingOrIteration(value: string | undefined, fallback: string): string {
  const trimmed = (value ?? '').trim();
  if (!trimmed || CSS_UNSAFE_VALUE_RE.test(trimmed)) {
    return fallback;
  }
  return trimmed;
}

function sanitizePropertyEntries(properties: Record<string, string>): [string, string][] {
  return Object.entries(properties).filter(([rawKey, rawValue]) => {
    const key = rawKey.trim();
    const value = String(rawValue ?? '').trim();
    return (
      Boolean(key) &&
      Boolean(value) &&
      !CSS_BREAKOUT_RE.test(key) &&
      CSS_IDENTIFIER_RE.test(key) &&
      !CSS_UNSAFE_VALUE_RE.test(value)
    );
  });
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
  animationName: string;
  keyframesCss: string;
  animationClassCss: string;
  fullCss: string;
} {
  const name = sanitizeAnimationName(animationName);
  const duration = sanitizeAnimationDuration(options.duration ?? '1s');
  const timingFunction = sanitizeTimingOrIteration(options.timingFunction, 'ease-in-out');
  const iterationCount = sanitizeTimingOrIteration(options.iterationCount, 'infinite');

  const sortedSteps = [...steps].sort((a, b) => a.percentage - b.percentage);

  const stepsStr = sortedSteps
    .map((step) => {
      const pct = Number.isFinite(step.percentage)
        ? Math.min(100, Math.max(0, step.percentage))
        : 0;
      const propsStr = sanitizePropertyEntries(step.properties)
        .map(([k, v]) => `    ${k.trim()}: ${String(v).trim()};`)
        .join('\n');
      return `  ${pct}% {\n${propsStr}\n  }`;
    })
    .join('\n\n');

  const keyframesCss = `@keyframes ${name} {\n${stepsStr}\n}`;
  const animationClassCss = `.${name} {\n  animation: ${name} ${duration} ${timingFunction} ${iterationCount};\n}`;
  const fullCss = `${keyframesCss}\n\n${animationClassCss}`;

  return {
    animationName: name,
    keyframesCss,
    animationClassCss,
    fullCss,
  };
}

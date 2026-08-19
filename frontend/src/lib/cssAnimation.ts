export type AnimationType = 'bounce' | 'pulse' | 'spin' | 'shake' | 'fade-in' | 'flip' | 'wobble' | 'zoom-in';
export type TimingFunction = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

export interface AnimationOptions {
  type: AnimationType;
  duration: number; // in seconds
  delay: number; // in seconds
  iterationCount: string; // 'infinite' or number
  timingFunction: TimingFunction;
}

export interface AnimationResult {
  css: string;
  keyframes: string;
  className: string;
}

const KEYFRAMES_MAP: Record<AnimationType, string> = {
  bounce: `@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-24px);
  }
  60% {
    transform: translateY(-12px);
  }
}`,
  pulse: `@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.85;
  }
}`,
  spin: `@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}`,
  shake: `@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  20%, 60% {
    transform: translateX(-10px);
  }
  40%, 80% {
    transform: translateX(10px);
  }
}`,
  'fade-in': `@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}`,
  flip: `@keyframes flip {
  0% {
    transform: perspective(400px) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateY(360deg);
  }
}`,
  wobble: `@keyframes wobble {
  0%, 100% {
    transform: translateX(0%);
  }
  15% {
    transform: translateX(-20%) rotate(-5deg);
  }
  30% {
    transform: translateX(15%) rotate(3deg);
  }
  45% {
    transform: translateX(-10%) rotate(-3deg);
  }
  60% {
    transform: translateX(5%) rotate(2deg);
  }
  75% {
    transform: translateX(-2%) rotate(-1deg);
  }
}`,
  'zoom-in': `@keyframes zoomIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}`,
};

export function generateCssAnimation(options: AnimationOptions): AnimationResult {
  const { type, duration, delay, iterationCount, timingFunction } = options;
  const animName = type === 'fade-in' ? 'fadeIn' : type === 'zoom-in' ? 'zoomIn' : type;
  const keyframes = KEYFRAMES_MAP[type];

  const css = `/* CSS Animation Class */
.animated-${type} {
  animation: ${animName} ${duration}s ${timingFunction} ${delay}s ${iterationCount};
}

/* Keyframes */
${keyframes}`;

  return {
    css,
    keyframes,
    className: `animated-${type}`,
  };
}

export function generateIsometricCss(angle = 60, scale = 0.866): string {
  return 'transform: rotateX(' + angle + 'deg) rotateZ(-45deg) scaleY(' + scale + ');\ntransform-style: preserve-3d;';
}

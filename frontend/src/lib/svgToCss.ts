export function svgToCss(svgString: string): { dataUri: string; cssBackground: string; cssMask: string } {
  const cleanSvg = svgString
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  const encoded = encodeURIComponent(cleanSvg)
    .replace(/%20/g, ' ')
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/');

  const dataUri = `data:image/svg+xml,${encoded}`;
  return {
    dataUri,
    cssBackground: `background-image: url("${dataUri}");`,
    cssMask: `mask-image: url("${dataUri}");\n-webkit-mask-image: url("${dataUri}");`,
  };
}

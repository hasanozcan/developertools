export interface SvgCssOptions {
  format: 'utf8-encoded' | 'base64';
  mode: 'background-image' | 'mask-image' | 'data-uri-only';
}

export function convertSvgToCssDataUri(svgString: string, options: SvgCssOptions = { format: 'utf8-encoded', mode: 'background-image' }): string {
  let cleaned = svgString.trim();
  if (!cleaned.includes('xmlns="http://www.w3.org/2000/svg"')) {
    cleaned = cleaned.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  let dataUri = '';
  if (options.format === 'base64') {
    const b64 = typeof window !== 'undefined' ? btoa(cleaned) : Buffer.from(cleaned).toString('base64');
    dataUri = 'data:image/svg+xml;base64,' + b64;
  } else {
    const encoded = cleaned
      .replace(/[\r\n\t]+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .replace(/%/g, '%25')
      .replace(/#/g, '%23')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E')
      .replace(/"/g, "'");
    dataUri = 'data:image/svg+xml,' + encoded;
  }

  if (options.mode === 'data-uri-only') {
    return dataUri;
  }

  if (options.mode === 'mask-image') {
    return 'mask-image: url("' + dataUri + '");\n-webkit-mask-image: url("' + dataUri + '");\nmask-repeat: no-repeat;\nmask-size: contain;';
  }

  return 'background-image: url("' + dataUri + '");\nbackground-repeat: no-repeat;\nbackground-size: contain;';
}

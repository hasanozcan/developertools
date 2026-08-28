export function convertSvgToAndroidVector(svgXml: string): string {
  const pathMatches = svgXml.match(/d="([^"]+)"/g) || [];
  const paths = pathMatches.map(m => {
    const d = m.replace(/^d="/, '').replace(/"$/, '');
    return '    <path android:fillColor="#FF000000" android:pathData="' + d + '" />';
  });
  return '<vector xmlns:android="http://schemas.android.com/apk/res/android"\n    android:width="24dp"\n    android:height="24dp"\n    android:viewportWidth="24"\n    android:viewportHeight="24">\n' + paths.join('\n') + '\n</vector>\n';
}

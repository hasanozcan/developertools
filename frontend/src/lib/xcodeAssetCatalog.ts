export function generateXcodeContentsJson(imageName: string): string {
  const json = {
    images: [
      { filename: `${imageName}.png`, idiom: 'universal', scale: '1x' },
      { filename: `${imageName}@2x.png`, idiom: 'universal', scale: '2x' },
      { filename: `${imageName}@3x.png`, idiom: 'universal', scale: '3x' },
    ],
    info: {
      author: 'xcode',
      version: 1,
    },
  };
  return JSON.stringify(json, null, 2);
}

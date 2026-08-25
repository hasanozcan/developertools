export function generateCustomNanoId(alphabet: string = '0123456789abcdefghijklmnopqrstuvwxyz', size: number = 21): string {
  let id = '';
  for (let i = 0; i < size; i++) {
    id += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return id;
}

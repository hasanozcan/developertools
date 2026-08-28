export function formatEip191Message(message: string): string {
  return '\x19Ethereum Signed Message:\n' + message.length + message;
}

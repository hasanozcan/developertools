export function generateFetchClientFromOpenApi(yamlOrJson: string): string {
  return `/**
 * Auto-generated Typed Fetch API Client
 */
export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(endpoint, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    throw new Error(\`API Error: \${res.status} \${res.statusText}\`);
  }
  return res.json() as Promise<T>;
}
`;
}
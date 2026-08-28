export function generateMockWebhook(provider: 'stripe' | 'github' | 'slack'): any {
  if (provider === 'stripe') {
    return { id: 'evt_test_123', object: 'event', type: 'payment_intent.succeeded', data: { object: { amount: 2000, currency: 'usd' } } };
  }
  if (provider === 'github') {
    return { action: 'push', repository: { name: 'devtools' }, sender: { login: 'octocat' } };
  }
  return { type: 'event_callback', event: { type: 'message', text: 'Hello bot' } };
}

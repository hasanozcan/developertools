import { parseCurl } from './curlToPython';

export function curlToAiSdk(curl: string, target: 'openai' | 'anthropic' = 'openai'): string {
  const parsed = parseCurl(curl);
  if (!parsed.url) return '// Error: Invalid cURL command';

  let messages: Array<{ role: string; content: string }> = [{ role: 'user', content: 'Hello!' }];
  let model = target === 'openai' ? 'gpt-4o' : 'claude-3-5-sonnet-20241022';
  let temperature = 0.7;

  if (parsed.data) {
    try {
      const json = JSON.parse(parsed.data);
      if (json.messages && Array.isArray(json.messages)) messages = json.messages;
      if (json.model) model = json.model;
      if (json.temperature !== undefined) temperature = json.temperature;
    } catch {
      // fallback
    }
  }

  if (target === 'anthropic') {
    return `import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
  const response = await anthropic.messages.create({
    model: '${model}',
    max_tokens: 1024,
    temperature: ${temperature},
    messages: ${JSON.stringify(messages.filter(m => m.role !== 'system'), null, 6).trim()},
  });

  console.log(response.content[0]);
}

main();`;
  }

  return `import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: '${model}',
    temperature: ${temperature},
    messages: ${JSON.stringify(messages, null, 6).trim()},
  });

  console.log(completion.choices[0].message.content);
}

main();`;
}

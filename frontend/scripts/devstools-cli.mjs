#!/usr/bin/env node

import { createHash, randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const [, , command, ...args] = process.argv;

function usage() {
  console.log(`DevsTools CLI

Usage:
  devstools json-format [file|-]
  devstools base64 <encode|decode> [text|-]
  devstools sha256 [text|-]
  devstools uuid [count]
  devstools timestamp [unix-seconds|iso-date]

Use - or omit input to read stdin.`);
}

async function readStdin() {
  if (process.stdin.isTTY) return '';
  let value = '';
  for await (const chunk of process.stdin) value += chunk;
  return value;
}

async function readInput(value) {
  if (!value || value === '-') return readStdin();
  try {
    return await readFile(value, 'utf8');
  } catch {
    return value;
  }
}

async function main() {
  switch (command) {
    case 'json-format': {
      const input = await readInput(args[0]);
      console.log(JSON.stringify(JSON.parse(input), null, 2));
      return;
    }
    case 'base64': {
      const mode = args[0];
      const input = await readInput(args.slice(1).join(' ') || undefined);
      if (mode === 'encode') console.log(Buffer.from(input, 'utf8').toString('base64'));
      else if (mode === 'decode') console.log(Buffer.from(input.trim(), 'base64').toString('utf8'));
      else throw new Error('base64 requires encode or decode');
      return;
    }
    case 'sha256': {
      const input = await readInput(args.join(' ') || undefined);
      console.log(createHash('sha256').update(input).digest('hex'));
      return;
    }
    case 'uuid': {
      const count = Math.min(Math.max(Number(args[0] || 1), 1), 100);
      for (let index = 0; index < count; index += 1) console.log(randomUUID());
      return;
    }
    case 'timestamp': {
      const value = args[0];
      if (!value) {
        console.log(Math.floor(Date.now() / 1000));
        return;
      }
      if (/^\d+$/.test(value)) {
        console.log(new Date(Number(value) * 1000).toISOString());
        return;
      }
      console.log(Math.floor(new Date(value).getTime() / 1000));
      return;
    }
    case undefined:
    case 'help':
    case '--help':
    case '-h':
      usage();
      return;
    default:
      throw new Error(`Unknown command: ${command}`);
  }
}

main().catch((error) => {
  console.error(`devstools: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});

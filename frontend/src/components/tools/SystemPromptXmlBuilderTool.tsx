'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import { buildXmlSystemPrompt } from '@/lib/systemPromptXmlBuilder';

export default function SystemPromptXmlBuilderTool() {
  const [role, setRole] = useState('Senior Full-Stack TypeScript Architect');
  const [context, setContext] = useState('You are developing modular Next.js developer utility tools with 100% test coverage.');
  const [instructions, setInstructions] = useState('Analyze input schema\nGenerate robust pure TypeScript functions\nAvoid runtime dependencies where possible');
  const [rules, setRules] = useState('Always export pure functions\nNever return undefined for required fields\nOutput standard GitHub markdown');
  const [outputFormat, setOutputFormat] = useState('Return pure TypeScript code wrapped in markdown blocks.');
  const [copied, setCopied] = useState(false);

  const promptOutput = useMemo(() => {
    return buildXmlSystemPrompt({
      role,
      context,
      instructions: instructions.split('\n').filter(Boolean),
      rules: rules.split('\n').filter(Boolean),
      outputFormat,
      examples: [],
    });
  }, [role, context, instructions, rules, outputFormat]);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={handleCopy} className="btn btn-primary btn-sm gap-2">
          {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied XML Prompt' : 'Copy System Prompt'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 rounded-xl border border-border bg-card space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              AI Identity & Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input input-bordered input-sm w-full font-medium text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Context & Objective
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="textarea textarea-bordered textarea-sm w-full h-20 text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Task Instructions (1 per line)
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="textarea textarea-bordered textarea-sm w-full h-24 text-xs font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Strict Rules & Constraints (1 per line)
            </label>
            <textarea
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              className="textarea textarea-bordered textarea-sm w-full h-24 text-xs font-mono"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Structured XML Output for Claude & OpenAI:
          </label>
          <textarea
            readOnly
            value={promptOutput}
            className="textarea textarea-bordered w-full h-[520px] font-mono text-xs leading-relaxed bg-muted/40 text-foreground"
          />
        </div>
      </div>
    </div>
  );
}

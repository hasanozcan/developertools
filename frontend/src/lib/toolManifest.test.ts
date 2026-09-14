import { describe, expect, it } from 'vitest';
import { toolCatalog } from './api';
import { getToolManifest, getWorkflowTargets, toolManifest } from './toolManifest';

describe('tool manifest contracts', () => {
  it('covers every catalog tool exactly once', () => {
    expect(toolManifest).toHaveLength(toolCatalog.length);
    expect(new Set(toolManifest.map((tool) => tool.slug)).size).toBe(toolCatalog.length);

    for (const tool of toolCatalog) {
      expect(getToolManifest(tool.slug)?.name).toBe(tool.name);
    }
  });

  it('only points workflows at existing tools', () => {
    for (const tool of toolManifest) {
      const targets = getWorkflowTargets(tool.slug);
      expect(targets).toHaveLength(tool.workflowTargets.length);
      expect(targets.every((target) => getToolManifest(target.slug))).toBe(true);
    }
  });

  it('only connects workflow tools with compatible output and input types', () => {
    for (const tool of toolManifest) {
      for (const target of getWorkflowTargets(tool.slug)) {
        const compatible = tool.outputTypes.some((outputType) => target.inputTypes.includes(outputType));
        expect(compatible, `${tool.slug} -> ${target.slug} has incompatible data types`).toBe(true);
      }
    }
  });

  it('does not expose share links for marked sensitive tools', () => {
    for (const tool of toolManifest.filter((candidate) => candidate.sensitive)) {
      expect(tool.shareable).toBe(false);
    }
  });
});

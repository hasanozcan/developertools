import type { ToolDataType } from '@/lib/toolManifest';

export const TOOL_OUTPUT_EVENT = 'devstools:tool-output';

export interface ToolOutputDetail {
  toolSlug: string;
  value: string;
  dataType: ToolDataType;
}

export function publishToolOutput(detail: ToolOutputDetail): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<ToolOutputDetail>(TOOL_OUTPUT_EVENT, { detail }));
}

export function encodeTransferredInput(value: string, dataType?: ToolDataType): string {
  const params = new URLSearchParams({ input: value });
  if (dataType) params.set('inputType', dataType);
  return `#${params.toString()}`;
}

export function readTransferredInput(hash: string): { value: string; dataType?: ToolDataType } | null {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const value = params.get('input');
  if (value === null) return null;
  const dataType = params.get('inputType') as ToolDataType | null;
  return { value, dataType: dataType ?? undefined };
}

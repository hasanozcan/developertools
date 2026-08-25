export interface ExplainNode {
  nodeType: string;
  relationName?: string;
  totalCost: number;
  actualTotalTime?: number;
  actualRows?: number;
  plans?: ExplainNode[];
}

export function parsePostgresExplainJson(jsonStr: string): { summary: string; nodes: ExplainNode[] } {
  let parsed: any;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    return { summary: 'Invalid JSON', nodes: [] };
  }

  const rootPlan = Array.isArray(parsed) ? (parsed[0]?.Plan || parsed[0]) : (parsed.Plan || parsed);
  if (!rootPlan) return { summary: 'No Plan found in JSON', nodes: [] };

  const extractNodes = (node: any): ExplainNode => ({
    nodeType: node['Node Type'] || 'Unknown',
    relationName: node['Relation Name'] || undefined,
    totalCost: node['Total Cost'] || 0,
    actualTotalTime: node['Actual Total Time'] || undefined,
    actualRows: node['Actual Rows'] || undefined,
    plans: node.Plans ? node.Plans.map(extractNodes) : undefined,
  });

  const root = extractNodes(rootPlan);
  const summary = `Root: ${root.nodeType} (Cost: ${root.totalCost}${root.actualTotalTime ? `, Time: ${root.actualTotalTime}ms` : ''})`;
  return { summary, nodes: [root] };
}

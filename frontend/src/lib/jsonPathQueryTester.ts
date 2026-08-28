export function queryJsonPath(data: any, pathExpr: string): any {
  if (pathExpr === '$' || !pathExpr) return data;
  const key = pathExpr.replace(/^\$\.?/, '');
  return data ? data[key] : undefined;
}

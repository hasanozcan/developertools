export function generatePrometheusRules(groupName = 'api_slos', expr = 'rate(http_requests_total[5m])'): string {
  return 'groups:\n  - name: ' + groupName + '\n    rules:\n      - record: job:http_requests:rate5m\n        expr: ' + expr + '\n      - alert: HighRequestLatency\n        expr: job:http_requests:rate5m > 1000\n        for: 5m\n        labels:\n          severity: critical\n        annotations:\n          summary: High traffic surge detected\n';
}

export interface PrometheusAlertConfig {
  alertName: string;
  expr: string;
  duration?: string;
  severity?: 'critical' | 'warning' | 'info';
  summary?: string;
  description?: string;
}

export function generatePrometheusAlert(config: PrometheusAlertConfig): string {
  const {
    alertName,
    expr,
    duration = '5m',
    severity = 'critical',
    summary = 'Service alert triggered',
    description = 'High latency or error threshold exceeded',
  } = config;

  return `groups:
- name: ${alertName}-alerts
  rules:
  - alert: ${alertName}
    expr: ${expr}
    for: ${duration}
    labels:
      severity: ${severity}
    annotations:
      summary: "${summary}"
      description: "${description}"`;
}

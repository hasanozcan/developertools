import { dump } from 'js-yaml';

export interface PrometheusRecordingRule {
  record: string;
  expr: string;
  labels?: Record<string, string>;
}

export interface PrometheusRulesConfig {
  groupName: string;
  interval?: string;
  rules: PrometheusRecordingRule[];
}

export function generatePrometheusRecordingRules(config: PrometheusRulesConfig): string {
  const groupName = config.groupName.trim();
  if (!groupName) {
    throw new Error('Rule group name is required.');
  }

  if (config.rules.length === 0) {
    throw new Error('Add at least one recording rule.');
  }

  const sanitizedRules = config.rules.map((rule, index) => {
    const record = rule.record.trim();
    const expr = rule.expr.trim();
    if (!record) {
      throw new Error(`Rule #${index + 1} is missing a recording metric name.`);
    }
    if (!expr) {
      throw new Error(`Rule #${index + 1} (${record}) is missing a PromQL expression.`);
    }

    const entry: Record<string, unknown> = { record, expr };
    if (rule.labels && Object.keys(rule.labels).length > 0) {
      entry.labels = rule.labels;
    }
    return entry;
  });

  const group: Record<string, unknown> = { name: groupName };
  if (config.interval && config.interval.trim()) {
    group.interval = config.interval.trim();
  }
  group.rules = sanitizedRules;

  return dump({ groups: [group] }, { lineWidth: -1, noRefs: true });
}

export function generatePrometheusRules(
  groupName = 'api_slos',
  expr = 'rate(http_requests_total[5m])',
): string {
  return generatePrometheusRecordingRules({
    groupName,
    interval: '1m',
    rules: [{ record: 'job:http_requests:rate5m', expr }],
  });
}

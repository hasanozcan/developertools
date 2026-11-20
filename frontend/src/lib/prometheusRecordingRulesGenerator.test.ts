import { describe, expect, it } from 'vitest';
import {
  generatePrometheusRecordingRules,
  generatePrometheusRules,
} from './prometheusRecordingRulesGenerator';

describe('prometheusRecordingRulesGenerator', () => {
  it('generates Prometheus recording rules', () => {
    const yaml = generatePrometheusRules();
    expect(yaml).toContain('groups:');
    expect(yaml).toContain('api_slos');
    expect(yaml).toContain('rate(http_requests_total[5m])');
  });

  it('supports custom group, interval, and multiple recording rules', () => {
    const yaml = generatePrometheusRecordingRules({
      groupName: 'checkout_slo',
      interval: '30s',
      rules: [
        { record: 'job:http_errors:rate5m', expr: 'rate(http_requests_total{status=~"5.."}[5m])' },
        {
          record: 'job:latency_p95:5m',
          expr: 'histogram_quantile(0.95, sum(rate(http_duration_bucket[5m])) by (le))',
        },
      ],
    });

    expect(yaml).toContain('name: checkout_slo');
    expect(yaml).toContain('interval: 30s');
    expect(yaml).toContain('record: job:http_errors:rate5m');
    expect(yaml).toContain('record: job:latency_p95:5m');
  });

  it('rejects empty group name or empty rule expression', () => {
    expect(() =>
      generatePrometheusRecordingRules({
        groupName: '',
        rules: [{ record: 'a:b:c', expr: 'up' }],
      }),
    ).toThrow(/group name/i);

    expect(() =>
      generatePrometheusRecordingRules({
        groupName: 'grp',
        rules: [{ record: 'a:b:c', expr: '' }],
      }),
    ).toThrow(/expression/i);
  });
});

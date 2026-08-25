import { describe, expect, it } from 'vitest';
import { calculateK8sPodQos } from './k8sResourceCalculator';

describe('k8sResourceCalculator', () => {
  it('determines Guaranteed QoS when requests equal limits', () => {
    const res = calculateK8sPodQos({ cpuRequest: 500, cpuLimit: 500, memoryRequest: 512, memoryLimit: 512 });
    expect(res.qosClass).toBe('Guaranteed');
    expect(res.yaml).toContain('cpu: "500m"');
  });

  it('determines BestEffort when no resources are set', () => {
    const res = calculateK8sPodQos({ cpuRequest: 0, cpuLimit: 0, memoryRequest: 0, memoryLimit: 0 });
    expect(res.qosClass).toBe('BestEffort');
  });
});

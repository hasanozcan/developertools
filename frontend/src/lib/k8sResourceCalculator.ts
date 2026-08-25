export interface K8sPodConfig {
  cpuRequest: number; // millicores
  cpuLimit: number;
  memoryRequest: number; // MiB
  memoryLimit: number;
}

export function calculateK8sPodQos(config: K8sPodConfig): {
  qosClass: 'Guaranteed' | 'Burstable' | 'BestEffort';
  yaml: string;
  summary: string;
} {
  let qosClass: 'Guaranteed' | 'Burstable' | 'BestEffort' = 'Burstable';

  if (!config.cpuRequest && !config.cpuLimit && !config.memoryRequest && !config.memoryLimit) {
    qosClass = 'BestEffort';
  } else if (
    config.cpuRequest &&
    config.cpuLimit &&
    config.memoryRequest &&
    config.memoryLimit &&
    config.cpuRequest === config.cpuLimit &&
    config.memoryRequest === config.memoryLimit
  ) {
    qosClass = 'Guaranteed';
  }

  const yaml = `resources:
  requests:
    cpu: "${config.cpuRequest}m"
    memory: "${config.memoryRequest}Mi"
  limits:
    cpu: "${config.cpuLimit}m"
    memory: "${config.memoryLimit}Mi"`;

  const summary = `QoS Class: ${qosClass} (CPU: ${config.cpuRequest}m-${config.cpuLimit}m, RAM: ${config.memoryRequest}Mi-${config.memoryLimit}Mi)`;
  return { qosClass, yaml, summary };
}

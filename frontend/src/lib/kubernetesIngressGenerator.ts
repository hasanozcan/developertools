export interface IngressConfig {
  name: string;
  host: string;
  serviceName: string;
  servicePort: number;
  enableTls: boolean;
  clusterIssuer?: string;
}

export function generateKubernetesIngressYaml(config: IngressConfig): string {
  const { name, host, serviceName, servicePort, enableTls, clusterIssuer } = config;
  const certAnnotation = clusterIssuer
    ? `    cert-manager.io/cluster-issuer: ${clusterIssuer}\n`
    : '';

  let tlsBlock = '';
  if (enableTls) {
    tlsBlock = `  tls:
    - hosts:
        - ${host}
      secretName: ${name}-tls-cert
`;
  }

  return `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${name}
  annotations:
    kubernetes.io/ingress.class: nginx
${certAnnotation}spec:
${tlsBlock}  rules:
    - host: ${host}
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: ${serviceName}
                port:
                  number: ${servicePort}
`;
}
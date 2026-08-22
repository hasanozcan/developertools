export function dockerComposeToK8s(composeYaml: string): string {
  const serviceMatches = Array.from(composeYaml.matchAll(/^\s*([a-zA-Z0-9_-]+):\s*$/gm));
  const imageMatches = Array.from(composeYaml.matchAll(/image:\s*([^\s\n]+)/g));

  const serviceName = serviceMatches.length > 1 ? serviceMatches[1][1] : 'web-app';
  const image = imageMatches.length > 0 ? imageMatches[0][1] : 'nginx:latest';

  return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${serviceName}-deployment
  labels:
    app: ${serviceName}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ${serviceName}
  template:
    metadata:
      labels:
        app: ${serviceName}
    spec:
      containers:
      - name: ${serviceName}
        image: ${image}
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: ${serviceName}-service
spec:
  selector:
    app: ${serviceName}
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: ClusterIP`;
}

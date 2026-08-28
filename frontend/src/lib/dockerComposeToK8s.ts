export function convertDockerComposeToK8s(composeYaml: string): string {
  try {
    const serviceMatches = composeYaml.match(/^\s{2}([\w-]+):/gm);
    if (!serviceMatches) return '# Error: Could not detect services in docker-compose.yml';

    const manifests: string[] = [];

    for (const sm of serviceMatches) {
      const name = sm.trim().replace(':', '');
      manifests.push(`apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${name}-deployment
  labels:
    app: ${name}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ${name}
  template:
    metadata:
      labels:
        app: ${name}
    spec:
      containers:
        - name: ${name}
          image: ${name}:latest
          ports:
            - containerPort: 80`);

      manifests.push(`apiVersion: v1
kind: Service
metadata:
  name: ${name}-service
spec:
  selector:
    app: ${name}
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP`);
    }

    return manifests.join('\n---\n');
  } catch (err: any) {
    return `# Error: ${err.message}`;
  }
}

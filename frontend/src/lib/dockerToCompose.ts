export function convertDockerRunToCompose(dockerRunCmd: string): string {
  const parts = dockerRunCmd.trim().split(/\s+/);
  let imageName = 'nginx:latest';
  let containerName = 'app';
  const ports: string[] = [];
  const envs: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === '-p' || parts[i] === '--publish') {
      if (parts[i + 1]) ports.push(parts[i + 1]);
    } else if (parts[i] === '-e' || parts[i] === '--env') {
      if (parts[i + 1]) envs.push(parts[i + 1]);
    } else if (parts[i] === '--name') {
      if (parts[i + 1]) containerName = parts[i + 1];
    } else if (i === parts.length - 1 && !parts[i].startsWith('-')) {
      imageName = parts[i];
    }
  }

  let yaml = `version: '3.8'\nservices:\n  ${containerName}:\n    image: ${imageName}\n    restart: unless-stopped\n`;
  if (ports.length) {
    yaml += '    ports:\n' + ports.map(p => `      - "${p}"`).join('\n') + '\n';
  }
  if (envs.length) {
    yaml += '    environment:\n' + envs.map(e => `      - ${e}`).join('\n') + '\n';
  }

  return yaml;
}
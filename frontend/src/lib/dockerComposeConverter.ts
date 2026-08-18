// Docker Run to Docker Compose Converter

export interface DockerRunParsed {
  serviceName: string;
  image: string;
  containerName?: string;
  restart?: string;
  ports: string[];
  volumes: string[];
  environment: Record<string, string>;
  networks: string[];
  command?: string;
  entrypoint?: string;
  workingDir?: string;
  user?: string;
  privileged?: boolean;
  shmSize?: string;
  labels: Record<string, string>;
}

export function parseDockerRun(cmd: string): DockerRunParsed {
  // Normalize command lines (join multi-line commands with backslashes)
  const normalized = cmd
    .replace(/\\\r?\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Tokenize preserving single and double quotes
  const tokens: string[] = [];
  let current = '';
  let inQuote: '"' | "'" | null = null;

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    if (char === '"' || char === "'") {
      if (inQuote === char) {
        inQuote = null;
      } else if (!inQuote) {
        inQuote = char;
      } else {
        current += char;
      }
    } else if (char === ' ' && !inQuote) {
      if (current.length > 0) {
        tokens.push(current);
        current = '';
      }
    } else {
      current += char;
    }
  }
  if (current.length > 0) {
    tokens.push(current);
  }

  // Remove leading 'docker' and 'run' or 'container run'
  let idx = 0;
  if (tokens[idx] === 'docker') idx++;
  if (tokens[idx] === 'container') idx++;
  if (tokens[idx] === 'run') idx++;

  const result: DockerRunParsed = {
    serviceName: 'app',
    image: '',
    ports: [],
    volumes: [],
    environment: {},
    networks: [],
    labels: {},
  };

  while (idx < tokens.length) {
    const token = tokens[idx];

    if (token === '-d' || token === '--detach' || token === '--rm' || token === '-it' || token === '-i' || token === '-t') {
      idx++;
      continue;
    }

    if (token === '--name' && idx + 1 < tokens.length) {
      result.containerName = tokens[++idx];
      result.serviceName = result.containerName.replace(/[^a-zA-Z0-9_-]/g, '_');
      idx++;
      continue;
    }

    if ((token === '-p' || token === '--publish') && idx + 1 < tokens.length) {
      result.ports.push(tokens[++idx]);
      idx++;
      continue;
    }

    if ((token === '-v' || token === '--volume') && idx + 1 < tokens.length) {
      result.volumes.push(tokens[++idx]);
      idx++;
      continue;
    }

    if ((token === '-e' || token === '--env') && idx + 1 < tokens.length) {
      const envPair = tokens[++idx];
      const eqIdx = envPair.indexOf('=');
      if (eqIdx !== -1) {
        result.environment[envPair.slice(0, eqIdx)] = envPair.slice(eqIdx + 1);
      } else {
        result.environment[envPair] = '';
      }
      idx++;
      continue;
    }

    if (token === '--restart' && idx + 1 < tokens.length) {
      result.restart = tokens[++idx];
      idx++;
      continue;
    }

    if ((token === '--network' || token === '--net') && idx + 1 < tokens.length) {
      result.networks.push(tokens[++idx]);
      idx++;
      continue;
    }

    if ((token === '-w' || token === '--workdir') && idx + 1 < tokens.length) {
      result.workingDir = tokens[++idx];
      idx++;
      continue;
    }

    if ((token === '-u' || token === '--user') && idx + 1 < tokens.length) {
      result.user = tokens[++idx];
      idx++;
      continue;
    }

    if (token === '--entrypoint' && idx + 1 < tokens.length) {
      result.entrypoint = tokens[++idx];
      idx++;
      continue;
    }

    if (token === '--privileged') {
      result.privileged = true;
      idx++;
      continue;
    }

    if (token === '--shm-size' && idx + 1 < tokens.length) {
      result.shmSize = tokens[++idx];
      idx++;
      continue;
    }

    // If it's an option we don't specially handle, skip flag & potential argument
    if (token.startsWith('-')) {
      idx++;
      continue;
    }

    // First non-flag token is the image name
    if (!result.image) {
      result.image = token;
      if (!result.containerName) {
        const cleanName = token.split('/').pop()?.split(':')[0] || 'app';
        result.serviceName = cleanName.replace(/[^a-zA-Z0-9_-]/g, '_');
      }
      idx++;

      // Any remaining tokens are container command
      if (idx < tokens.length) {
        result.command = tokens.slice(idx).join(' ');
        break;
      }
      continue;
    }

    idx++;
  }

  return result;
}

export function generateDockerComposeYaml(parsed: DockerRunParsed): string {
  const lines: string[] = ['services:'];
  const svc = parsed.serviceName || 'app';
  lines.push(`  ${svc}:`);
  lines.push(`    image: ${parsed.image || 'nginx:latest'}`);

  if (parsed.containerName) {
    lines.push(`    container_name: ${parsed.containerName}`);
  }

  if (parsed.restart) {
    lines.push(`    restart: ${parsed.restart}`);
  }

  if (parsed.ports.length > 0) {
    lines.push('    ports:');
    parsed.ports.forEach((p) => lines.push(`      - "${p}"`));
  }

  if (parsed.volumes.length > 0) {
    lines.push('    volumes:');
    parsed.volumes.forEach((v) => lines.push(`      - ${v}`));
  }

  if (Object.keys(parsed.environment).length > 0) {
    lines.push('    environment:');
    Object.entries(parsed.environment).forEach(([k, v]) => {
      lines.push(`      - ${k}=${v}`);
    });
  }

  if (parsed.networks.length > 0) {
    lines.push('    networks:');
    parsed.networks.forEach((n) => lines.push(`      - ${n}`));
  }

  if (parsed.command) {
    lines.push(`    command: ${parsed.command}`);
  }

  if (parsed.entrypoint) {
    lines.push(`    entrypoint: ${parsed.entrypoint}`);
  }

  if (parsed.workingDir) {
    lines.push(`    working_dir: ${parsed.workingDir}`);
  }

  if (parsed.user) {
    lines.push(`    user: "${parsed.user}"`);
  }

  if (parsed.privileged) {
    lines.push('    privileged: true');
  }

  if (parsed.shmSize) {
    lines.push(`    shm_size: ${parsed.shmSize}`);
  }

  if (parsed.networks.length > 0) {
    lines.push('');
    lines.push('networks:');
    parsed.networks.forEach((n) => {
      lines.push(`  ${n}:`);
      lines.push('    driver: bridge');
    });
  }

  return lines.join('\n');
}

export type ProjectType = 'node' | 'python' | 'go' | 'rust' | 'static' | 'php';

export interface DockerfileOptions {
  projectType: ProjectType;
  version: string;
  port: number;
  packageManager?: 'npm' | 'yarn' | 'pnpm';
  entrypoint?: string;
  isMultiStage?: boolean;
}

export function generateDockerfile(options: DockerfileOptions): string {
  const {
    projectType,
    version,
    port,
    packageManager = 'npm',
    entrypoint = 'index.js',
    isMultiStage = true,
  } = options;

  switch (projectType) {
    case 'node':
      if (isMultiStage) {
        return `# Multi-stage Build for Node.js
FROM node:${version || '20-alpine'} AS builder
WORKDIR /app

# Copy dependency files
COPY package*.json ${packageManager === 'yarn' ? 'yarn.lock' : packageManager === 'pnpm' ? 'pnpm-lock.yaml' : ''} ./
${packageManager === 'pnpm' ? 'RUN npm install -g pnpm && pnpm install --frozen-lockfile' : packageManager === 'yarn' ? 'RUN yarn install --frozen-lockfile' : 'RUN npm ci'}

# Copy source code and build
COPY . .
RUN ${packageManager === 'npm' ? 'npm run build --if-present' : packageManager === 'yarn' ? 'yarn build' : 'pnpm build'}

# Production Runtime
FROM node:${version || '20-alpine'} AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=${port}

# Create non-root user
USER node

# Copy artifacts from builder
COPY --from=builder --chown=node:node /app ./

EXPOSE ${port}
CMD ["node", "${entrypoint}"]`;
      }
      return `FROM node:${version || '20-alpine'}
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${port}
CMD ["node", "${entrypoint}"]`;

    case 'python':
      return `# Python Production Dockerfile
FROM python:${version || '3.11-slim'} AS base
ENV PYTHONDONTWRITEBYTECODE=1 \\
    PYTHONUNBUFFERED=1 \\
    PORT=${port}

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends gcc && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Run as non-root user
RUN useradd -m appuser && chown -R appuser /app
USER appuser

EXPOSE ${port}
CMD ["python", "${entrypoint || 'app.py'}"]`;

    case 'go':
      return `# Multi-stage Go Build
FROM golang:${version || '1.22-alpine'} AS builder
WORKDIR /app

# Download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy source and compile binary
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o /app/server .

# Scratch or Distroless minimal runtime
FROM alpine:latest
WORKDIR /app
RUN apk --no-cache add ca-certificates

COPY --from=builder /app/server /app/server

EXPOSE ${port}
ENTRYPOINT ["/app/server"]`;

    case 'rust':
      return `# Multi-stage Rust Build
FROM rust:${version || '1.78-alpine'} AS builder
WORKDIR /app
RUN apk add --no-cache musl-dev

COPY Cargo.toml Cargo.lock ./
COPY src ./src
RUN cargo build --release

# Minimal Runtime
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/target/release/app /app/server

EXPOSE ${port}
CMD ["/app/server"]`;

    case 'static':
      return `# Static SPA / HTML with Nginx
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`;

    case 'php':
      return `FROM php:${version || '8.2-apache'}
COPY . /var/www/html/
RUN docker-php-ext-install pdo pdo_mysql
EXPOSE 80`;

    default:
      return `FROM alpine:latest\nCMD ["echo", "Hello World"]`;
  }
}

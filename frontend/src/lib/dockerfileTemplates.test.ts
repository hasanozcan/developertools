import { describe, it, expect } from 'vitest';
import { generateDockerfile } from './dockerfileTemplates';

describe('dockerfileTemplates', () => {
  it('should generate multi-stage Node.js Dockerfile', () => {
    const output = generateDockerfile({
      projectType: 'node',
      version: '20-alpine',
      port: 3000,
      packageManager: 'npm',
      entrypoint: 'src/index.js',
      isMultiStage: true,
    });
    expect(output).toContain('FROM node:20-alpine AS builder');
    expect(output).toContain('FROM node:20-alpine AS runner');
    expect(output).toContain('EXPOSE 3000');
    expect(output).toContain('USER node');
  });

  it('should generate Go Dockerfile with scratch/alpine runtime', () => {
    const output = generateDockerfile({
      projectType: 'go',
      version: '1.22-alpine',
      port: 8080,
    });
    expect(output).toContain('FROM golang:1.22-alpine AS builder');
    expect(output).toContain('CGO_ENABLED=0 GOOS=linux');
    expect(output).toContain('EXPOSE 8080');
  });

  it('should generate Python Dockerfile with non-root appuser', () => {
    const output = generateDockerfile({
      projectType: 'python',
      version: '3.11-slim',
      port: 8000,
      entrypoint: 'main.py',
    });
    expect(output).toContain('FROM python:3.11-slim AS base');
    expect(output).toContain('USER appuser');
    expect(output).toContain('EXPOSE 8000');
  });
});

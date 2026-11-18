import path from 'node:path';
import { defineConfig } from 'vitest/config';

const DOM_LIB_TESTS = [
  'src/lib/adsense.test.ts',
  'src/lib/analytics.test.ts',
  'src/lib/awsIamPolicyBuilder.test.ts',
  'src/lib/certificate.test.ts',
  'src/lib/codePlayground.test.ts',
  'src/lib/contactRequestSecurity.test.ts',
  'src/lib/contentBlockerDetection.test.ts',
  'src/lib/githubActionsMatrixBuilder.test.ts',
  'src/lib/googleAds.test.ts',
  'src/lib/htmlToMarkdown.test.ts',
  'src/lib/jsonPath.test.ts',
  'src/lib/jsonPointer.test.ts',
  'src/lib/jsonSchemaValidator.test.ts',
  'src/lib/jwtSignatureValidator.test.ts',
  'src/lib/markdown.test.ts',
  'src/lib/markdownToHtml.test.ts',
  'src/lib/markdownToSlides.test.ts',
  'src/lib/ragChunkingCalculator.test.ts',
  'src/lib/ragChunkingVisualizer.test.ts',
  'src/lib/sslCertificateInspector.test.ts',
  'src/lib/toolSeoContent.test.ts',
  'src/lib/xmlToJson.test.ts',
];

export default defineConfig({
  oxc: {
    jsx: {
      runtime: 'automatic',
      importSource: 'react',
    },
  },
  test: {
    environment: 'jsdom',
    maxWorkers: 4,
    globals: true,
    testTimeout: 15_000,
    setupFiles: ['./src/test/setup.ts'],
    projects: [
      {
        extends: true,
        test: {
          name: 'dom',
          pool: 'threads',
          include: [
            'src/**/*.test.tsx',
            'src/app/**/*.test.ts',
            'src/components/**/*.test.ts',
            'src/translations/**/*.test.ts',
            ...DOM_LIB_TESTS,
          ],
        },
      },
      {
        extends: true,
        test: {
          name: 'node',
          pool: 'threads',
          environment: 'node',
          setupFiles: [],
          include: ['src/lib/**/*.test.ts'],
          exclude: ['src/lib/cron.test.ts', ...DOM_LIB_TESTS],
        },
      },
      {
        extends: true,
        test: {
          name: 'tz-isolated',
          pool: 'forks',
          environment: 'node',
          setupFiles: [],
          include: ['src/lib/cron.test.ts'],
        },
      },
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'server-only': path.resolve(__dirname, './src/test/server-only.ts'),
    },
  },
});

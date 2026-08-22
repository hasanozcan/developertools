export interface GitLabCiConfig {
  stages: string[];
  nodeVersion: string;
}

export function generateGitLabCiYaml(config: GitLabCiConfig): string {
  return `image: node:${config.nodeVersion}

stages:
${config.stages.map(s => `  - ${s}`).join('\n')}

cache:
  paths:
    - node_modules/

lint_and_test:
  stage: test
  script:
    - npm ci
    - npm run lint
    - npm test
`;
}
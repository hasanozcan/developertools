export function generateGitlabCi(stages = ['build', 'test', 'deploy'], nodeVersion = '20'): string {
  return 'image: node:' + nodeVersion + '\n\nstages:\n' + stages.map(s => '  - ' + s).join('\n') + '\n\ncache:\n  paths:\n    - node_modules/\n\nbuild_job:\n  stage: build\n  script:\n    - npm ci\n    - npm run build\n\ntest_job:\n  stage: test\n  script:\n    - npm test\n';
}

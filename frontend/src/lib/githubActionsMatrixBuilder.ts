export interface MatrixConfig {
  workflowName: string;
  osList: string[];
  nodeVersions: string[];
}

export function generateGithubActionsMatrixYaml(config: MatrixConfig): string {
  return `name: ${config.workflowName}

jobs:
  test:
    runs-on: \${{ matrix.os }}
    strategy:
      matrix:
        os: [${config.osList.join(', ')}]
        node-version: [${config.nodeVersions.join(', ')}]
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
`;
}
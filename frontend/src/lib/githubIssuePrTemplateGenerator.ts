export function generateGithubTemplate(type: 'bug' | 'feature' | 'pr'): string {
  if (type === 'bug') {
    return '---' + '\nname: Bug Report\nabout: Create a report to help us improve\ntitle: "[BUG] "\nlabels: bug\n---\n\n## Describe the Bug\nA clear and concise description.\n\n## Steps to Reproduce\n1. Go to...\n2. Click on...\n\n## Expected Behavior\nWhat you expected to happen.';
  } else if (type === 'feature') {
    return '---' + '\nname: Feature Request\nabout: Suggest an idea\ntitle: "[FEAT] "\nlabels: enhancement\n---\n\n## Problem Statement\n\n## Proposed Solution\n';
  }
  return '## Description of Changes\n\n## Related Issues\nFixes #\n\n## Checklist\n- [ ] Tests added/updated\n- [ ] Docs updated';
}

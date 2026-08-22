export interface GitCommandOptions {
  action: 'rebase' | 'cherry-pick' | 'reset' | 'stash' | 'clean';
  args: Record<string, string | boolean>;
}

export function buildGitCommand(options: GitCommandOptions): string {
  const { action, args } = options;

  switch (action) {
    case 'rebase':
      return `git rebase -i ${args.branch || 'main'}`;
    case 'cherry-pick':
      return `git cherry-pick ${args.commitHash || 'HEAD~1'}`;
    case 'reset':
      return `git reset ${args.hard ? '--hard' : '--soft'} ${args.target || 'HEAD~1'}`;
    case 'stash':
      return `git stash save "${args.message || 'wip'}"`;
    case 'clean':
      return 'git clean -fd';
  }
}

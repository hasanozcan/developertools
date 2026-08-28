export type GitAction =
  | 'squash-rebase'
  | 'cherry-pick'
  | 'undo-commit'
  | 'hard-reset'
  | 'git-bisect'
  | 'submodule-update';

export interface GitActionParams {
  action: GitAction;
  commitsCount?: number;
  branchName?: string;
  commitHash?: string;
  keepChanges?: boolean;
}

export function buildGitCommand(params: GitActionParams): { commands: string[]; description: string; safetyNote?: string } {
  switch (params.action) {
    case 'squash-rebase':
      return {
        commands: [
          'git rebase -i HEAD~' + (params.commitsCount || 3),
          '# In the editor, change "pick" to "squash" or "s" for all commits after the first.',
        ],
        description: 'Interactively squash the last ' + (params.commitsCount || 3) + ' commits into a single clean commit.',
        safetyNote: 'Do not rebase branches that have already been pushed and shared with other teammates.',
      };
    case 'cherry-pick':
      return {
        commands: ['git cherry-pick ' + (params.commitHash || 'a1b2c3d')],
        description: 'Apply the changes introduced by commit ' + (params.commitHash || 'a1b2c3d') + ' onto current branch.',
      };
    case 'undo-commit':
      return {
        commands: [params.keepChanges !== false ? 'git reset --soft HEAD~1' : 'git reset --hard HEAD~1'],
        description: params.keepChanges !== false
          ? 'Undo last commit while preserving all changes staged in your working directory.'
          : 'Completely discard the last commit and all uncommitted file changes.',
        safetyNote: params.keepChanges === false ? 'Warning: Discarded changes cannot be recovered.' : undefined,
      };
    case 'hard-reset':
      return {
        commands: [
          'git stash push -u -m "Backup before hard reset"',
          'git reset --hard origin/' + (params.branchName || 'main'),
        ],
        description: 'Force sync local branch to match origin/' + (params.branchName || 'main') + ' safely with a backup stash.',
      };
    case 'git-bisect':
      return {
        commands: [
          'git bisect start',
          'git bisect bad                 # Current commit has bug',
          'git bisect good ' + (params.commitHash || 'v1.0.0') + '      # Known good commit',
          '# Test build, then type: git bisect good OR git bisect bad',
          'git bisect reset               # Finish bisect session',
        ],
        description: 'Binary search through commit history to locate the exact commit that introduced a bug.',
      };
    default:
      return {
        commands: ['git submodule update --init --recursive'],
        description: 'Initialize and pull all Git nested submodules recursively.',
      };
  }
}

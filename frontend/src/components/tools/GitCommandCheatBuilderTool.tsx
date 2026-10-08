'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check, GitFork, AlertCircle } from 'lucide-react';
import { buildGitCommand, GitAction } from '@/lib/gitCommandCheatBuilder';

export default function GitCommandCheatBuilderTool() {
  const { t } = useLanguage();
  const [action, setAction] = useState<GitAction>('squash-rebase');
  const [commitsCount, setCommitsCount] = useState<number>(3);
  const [branchName, setBranchName] = useState<string>('main');
  const [commitHash, setCommitHash] = useState<string>('a1b2c3d');
  const [keepChanges, setKeepChanges] = useState<boolean>(true);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return buildGitCommand({
      action,
      commitsCount,
      branchName,
      commitHash,
      keepChanges,
    });
  }, [action, commitsCount, branchName, commitHash, keepChanges]);

  const commandString = result.commands.join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(commandString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-4 rounded-xl border border-border bg-card space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-2">
              {t("uiText.be4384ee")}</label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value as GitAction)}
              className="select select-bordered select-sm w-full"
            >
              <option value="squash-rebase">{t("uiText.9a33f409")}</option>
              <option value="cherry-pick">{t("uiText.8442f5d3")}</option>
              <option value="undo-commit">{t("uiText.8a0a648a")}</option>
              <option value="hard-reset">{t("uiText.9b0c2d9b")}</option>
              <option value="git-bisect">{t("uiText.938d2746")}</option>
              <option value="submodule-update">{t("uiText.dc56f574")}</option>
            </select>
          </div>

          {action === 'squash-rebase' && (
            <div>
              <label className="text-xs text-muted-foreground block mb-1">
                {t("uiText.4ac86061")}{commitsCount})
              </label>
              <input
                type="range"
                min="2"
                max="10"
                value={commitsCount}
                onChange={(e) => setCommitsCount(parseInt(e.target.value, 10))}
                className="range range-primary range-sm w-full"
              />
            </div>
          )}

          {action === 'cherry-pick' && (
            <div>
              <label className="text-xs text-muted-foreground block mb-1">{t("uiText.41c47f6a")}</label>
              <input
                type="text"
                value={commitHash}
                onChange={(e) => setCommitHash(e.target.value)}
                className="input input-bordered input-sm w-full font-mono text-xs"
              />
            </div>
          )}

          {action === 'hard-reset' && (
            <div>
              <label className="text-xs text-muted-foreground block mb-1">{t("uiText.28c67052")}</label>
              <input
                type="text"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                className="input input-bordered input-sm w-full font-mono text-xs"
              />
            </div>
          )}

          {action === 'undo-commit' && (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="softUndo"
                checked={keepChanges}
                onChange={(e) => setKeepChanges(e.target.checked)}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <label htmlFor="softUndo" className="text-xs text-muted-foreground cursor-pointer">
                {t("uiText.9e347fc0")}</label>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card space-y-2">
            <h4 className="text-sm font-semibold text-foreground">{result.description}</h4>
            {result.safetyNote && (
              <div className="flex items-center gap-2 text-warning text-xs mt-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{result.safetyNote}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-muted-foreground">{t("uiText.cf115b5b")}</label>
              <button onClick={handleCopy} className="btn btn-primary btn-xs gap-1">
                {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? t("uiText.8dc21305") : t("uiText.ea71d462")}
              </button>
            </div>
            <textarea
              readOnly
              value={commandString}
              className="textarea textarea-bordered w-full h-44 font-mono text-xs leading-relaxed bg-muted/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

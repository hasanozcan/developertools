export interface GitignoreTemplate {
  id: string;
  name: string;
  category: 'languages' | 'frameworks' | 'os' | 'editors' | 'tools';
  content: string;
}

export const GITIGNORE_TEMPLATES: GitignoreTemplate[] = [
  {
    id: 'node',
    name: 'Node.js / JavaScript / TypeScript',
    category: 'languages',
    content: `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Diagnostic reports
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Dependency directories
node_modules/
jspm_packages/

# TypeScript cache
*.tsbuildinfo

# Build outputs
dist/
build/
out/
.next/
.nuxt/
.vuepress/dist
.serverless/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
*.env.*.local`,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    content: `# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual environments
venv/
.venv/
ENV/
env/

# Jupyter Notebook checkpoints
.ipynb_checkpoints

# pytest / coverage
.pytest_cache/
.coverage
htmlcov/
.tox/`,
  },
  {
    id: 'go',
    name: 'Go (Golang)',
    category: 'languages',
    content: `# Binaries for programs and plugins
*.exe
*.exe~
*.dll
*.so
*.dylib

# Test binary, built with 'go test -c'
*.test

# Output of the go coverage tool
*.out

# Go workspace file
go.work
go.work.sum

# Vendor directory
vendor/`,
  },
  {
    id: 'rust',
    name: 'Rust (Cargo)',
    category: 'languages',
    content: `# Cargo build artifacts
/target/

# Cargo.lock is tracked for bins, but optional for libs
# Cargo.lock

# Temporary files
**/*.rs.bk`,
  },
  {
    id: 'java',
    name: 'Java / Kotlin (Maven & Gradle)',
    category: 'languages',
    content: `# Compiled class file
*.class

# Log file
*.log

# BlueJ files
*.ctxt

# Mobile Tools for Java (J2ME)
.mtj.tmp/

# Package Files
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# Maven
target/
pom.xml.tag
pom.xml.releaseBackup
pom.xml.versionsBackup
pom.xml.next

# Gradle
.gradle/
build/
!gradle/wrapper/gradle-wrapper.jar`,
  },
  {
    id: 'macos',
    name: 'macOS (.DS_Store)',
    category: 'os',
    content: `# General macOS
.DS_Store
.AppleDouble
.LSOverride

# Icon must end with two \\r
Icon\\r\\r

# Thumbnails
._*

# Files that might appear in the root of a volume
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
.com.apple.timemachine.donotpresent`,
  },
  {
    id: 'windows',
    name: 'Windows',
    category: 'os',
    content: `# Windows thumbnail cache files
Thumbs.db
Thumbs.db:encryptable
ehthumbs.db
ehthumbs_vista.db

# Folder config file
[Dd]esktop.ini

# Recycle Bin used on shared drives
$RECYCLE.BIN/

# Windows Installer files
*.cab
*.msi
*.msix
*.msm
*.msp`,
  },
  {
    id: 'linux',
    name: 'Linux',
    category: 'os',
    content: `*~
# temporary files which can be created if a process still has a file open
.fuse_hidden*

# KDE directory preferences
.directory

# Linux trash folder which might appear on any partition or disk
.Trash-*

# .nfs files
.nfs*`,
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    category: 'editors',
    content: `.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
!.vscode/*.code-snippets

# Local History for Visual Studio Code
.history/

# Built Visual Studio Code Extensions
*.vsix`,
  },
  {
    id: 'jetbrains',
    name: 'JetBrains IDEs (IntelliJ, WebStorm, PyCharm)',
    category: 'editors',
    content: `# Covers JetBrains IDEs: IntelliJ, RubyMine, PhpStorm, AppCode, PyCharm, CLion, Android Studio, WebStorm and Rider
.idea/
*.iws
*.iml
*.ipr
out/
!**/src/main/**/out/
!**/src/test/**/out/`,
  },
  {
    id: 'react',
    name: 'React / Next.js / Vite',
    category: 'frameworks',
    content: `# Next.js
.next/
out/

# Vite
dist/

# Env local
.env*.local`,
  },
  {
    id: 'vue',
    name: 'Vue.js / Nuxt',
    category: 'frameworks',
    content: `# Nuxt build
.nuxt/
.output/
dist/`,
  },
];

export function generateGitignore(selectedIds: string[], customLines: string = ''): string {
  const sections: string[] = [];

  for (const id of selectedIds) {
    const tpl = GITIGNORE_TEMPLATES.find((t) => t.id === id);
    if (tpl) {
      sections.push(`### ${tpl.name} ###\n${tpl.content}`);
    }
  }

  if (customLines.trim()) {
    sections.push(`### Custom Rules ###\n${customLines.trim()}`);
  }

  return sections.join('\n\n');
}

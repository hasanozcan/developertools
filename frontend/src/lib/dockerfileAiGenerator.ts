export function generateDockerfile(stack: 'node' | 'python' | 'go' | 'rust', port = 3000): string {
  switch (stack) {
    case 'node':
      return 'FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=builder /app/package*.json ./\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY --from=builder /app/dist ./dist\nUSER node\nEXPOSE ' + port + '\nCMD ["node", "dist/index.js"]\n';
    case 'python':
      return 'FROM python:3.11-slim AS builder\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\n\nEXPOSE ' + port + '\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "' + port + '"]\n';
    case 'go':
      return 'FROM golang:1.22-alpine AS builder\nWORKDIR /app\nCOPY go.* ./\nRUN go mod download\nCOPY . .\nRUN CGO_ENABLED=0 GOOS=linux go build -o server .\n\nFROM scratch\nCOPY --from=builder /app/server /server\nEXPOSE ' + port + '\nENTRYPOINT ["/server"]\n';
    case 'rust':
      return 'FROM rust:1.78-alpine AS builder\nWORKDIR /app\nCOPY . .\nRUN cargo build --release\n\nFROM alpine:3.19\nCOPY --from=builder /app/target/release/app /app\nEXPOSE ' + port + '\nCMD ["/app"]\n';
  }
}

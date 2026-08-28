export function generateRandomizedCron(baseCron = '0 3 * * *', maxJitterSec = 300): string {
  return 'sleep ' + Math.floor(Math.random() * maxJitterSec) + ' && /usr/local/bin/backup.sh';
}

export function generateStoredProcedure(procName = 'archive_old_records', table = 'logs', days = 30): string {
  return 'DELIMITER //\n\nCREATE PROCEDURE ' + procName + '()\nBEGIN\n    DELETE FROM ' + table + '\n    WHERE created_at < NOW() - INTERVAL ' + days + ' DAY;\nEND //\n\nDELIMITER ;\n';
}

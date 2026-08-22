export function parseMongoObjectId(hexId: string): {
  isValid: boolean;
  timestamp?: Date;
  isoString?: string;
  machineIdentifier?: string;
  processId?: number;
  counter?: number;
} {
  const cleaned = hexId.trim().toLowerCase();
  if (!/^[0-9a-f]{24}$/.test(cleaned)) {
    return { isValid: false };
  }

  const timestampSeconds = parseInt(cleaned.substring(0, 8), 16);
  const timestamp = new Date(timestampSeconds * 1000);
  const machineIdentifier = cleaned.substring(8, 14);
  const processId = parseInt(cleaned.substring(14, 18), 16);
  const counter = parseInt(cleaned.substring(18, 24), 16);

  return {
    isValid: true,
    timestamp,
    isoString: timestamp.toISOString(),
    machineIdentifier,
    processId,
    counter,
  };
}

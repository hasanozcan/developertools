export interface CsvOptions {
  delimiter: string;
  hasHeaders: boolean;
}

export interface CsvPreview {
  headers: string[];
  rows: Record<string, string>[];
}

function validateDelimiter(delimiter: string): void {
  if (delimiter.length !== 1 || delimiter === '"' || delimiter === '\r' || delimiter === '\n') {
    throw new Error('CSV delimiter must be one non-quote character.');
  }
}

export function parseCsvRecords(csv: string, delimiter: string): string[][] {
  validateDelimiter(delimiter);
  if (!csv.trim()) throw new Error('CSV is empty');

  const records: string[][] = [];
  let record: string[] = [];
  let field = '';
  let inQuotes = false;
  let fieldStarted = false;

  const finishField = () => {
    record.push(field);
    field = '';
    fieldStarted = false;
  };

  const finishRecord = () => {
    finishField();
    records.push(record);
    record = [];
  };

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];
    const nextCharacter = csv[index + 1];

    if (inQuotes) {
      if (character === '"' && nextCharacter === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        inQuotes = false;
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"') {
      if (fieldStarted) throw new Error('Unexpected quote in unquoted CSV field.');
      inQuotes = true;
      fieldStarted = true;
    } else if (character === delimiter) {
      finishField();
    } else if (character === '\n' || character === '\r') {
      finishRecord();
      if (character === '\r' && nextCharacter === '\n') index += 1;
    } else {
      field += character;
      fieldStarted = true;
    }
  }

  if (inQuotes) throw new Error('CSV contains an unterminated quoted field.');
  if (field.length > 0 || fieldStarted || record.length > 0) finishRecord();

  return records.filter((row) => row.some((value) => value.length > 0));
}

export function csvToJson(csv: string, options: CsvOptions): Record<string, string>[] {
  const records = parseCsvRecords(csv, options.delimiter);
  if (records.length === 0) throw new Error('CSV is empty');

  const headers = options.hasHeaders
    ? records[0]
    : records[0].map((_, index) => `column${index + 1}`);
  const dataRecords = options.hasHeaders ? records.slice(1) : records;

  return dataRecords.map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])),
  );
}

export function generateCsvPreview(
  csv: string,
  delimiter: string,
  maxRows: number = 5,
): CsvPreview {
  const records = parseCsvRecords(csv, delimiter);
  if (records.length === 0) return { headers: [], rows: [] };

  const headers = records[0];
  const rows = records
    .slice(1, maxRows + 1)
    .map((values) =>
      Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])),
    );

  return { headers, rows };
}

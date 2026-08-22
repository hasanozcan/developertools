export function csvToParquetSchema(csvText: string): string {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) {
    throw new Error('CSV must contain a header and at least one row of data.');
  }

  const headers = lines[0].split(',').map((h) => h.trim());
  const sampleRow = lines[1].split(',').map((v) => v.trim());

  const fields = headers.map((header, i) => {
    const val = sampleRow[i] || '';
    let pyArrowType = 'pa.string()';

    if (val.toLowerCase() === 'true' || val.toLowerCase() === 'false') {
      pyArrowType = 'pa.bool_()';
    } else if (!isNaN(Number(val)) && val !== '') {
      pyArrowType = Number.isInteger(Number(val)) ? 'pa.int64()' : 'pa.float64()';
    }

    return `    pa.field('${header}', ${pyArrowType})`;
  });

  return `import pyarrow as pa\n\nschema = pa.schema([\n${fields.join(',\n')}\n])`;
}

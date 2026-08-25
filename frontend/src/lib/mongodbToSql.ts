export function mongodbToSql(mongoQuery: string, collectionName: string = 'users'): string {
  try {
    const filter = JSON.parse(mongoQuery);
    const conditions: string[] = [];

    for (const [k, v] of Object.entries(filter)) {
      if (typeof v === 'object' && v !== null) {
        const sub = v as Record<string, any>;
        if (sub['$eq'] !== undefined) conditions.push(`${k} = '${sub['$eq']}'`);
        else if (sub['$gt'] !== undefined) conditions.push(`${k} > ${sub['$gt']}`);
        else if (sub['$gte'] !== undefined) conditions.push(`${k} >= ${sub['$gte']}`);
        else if (sub['$lt'] !== undefined) conditions.push(`${k} < ${sub['$lt']}`);
        else if (sub['$lte'] !== undefined) conditions.push(`${k} <= ${sub['$lte']}`);
        else if (sub['$in'] && Array.isArray(sub['$in'])) conditions.push(`${k} IN (${sub['$in'].map((x: any) => typeof x === 'string' ? `'${x}'` : x).join(', ')})`);
      } else {
        conditions.push(typeof v === 'string' ? `${k} = '${v}'` : `${k} = ${v}`);
      }
    }

    return `SELECT * FROM ${collectionName}${conditions.length > 0 ? ' WHERE ' + conditions.join(' AND ') : ''};`;
  } catch {
    return `SELECT * FROM ${collectionName};`;
  }
}

const SQL_KEYWORDS = [
  'select', 'from', 'where', 'and', 'or', 'not', 'insert', 'into', 'values', 'update', 'set', 'delete',
  'join', 'inner join', 'left join', 'right join', 'full join', 'cross join', 'on', 'group by', 'order by',
  'having', 'limit', 'offset', 'as', 'create', 'table', 'alter', 'drop', 'primary key', 'foreign key',
  'constraint', 'unique', 'null', 'is null', 'is not null', 'in', 'between', 'like', 'distinct', 'union', 'all'
];

export function uppercaseSqlKeywords(sql: string): string {
  let result = sql;
  for (const kw of SQL_KEYWORDS) {
    const regex = new RegExp(`\\b${kw}\\b`, 'gi');
    result = result.replace(regex, kw.toUpperCase());
  }
  return result;
}

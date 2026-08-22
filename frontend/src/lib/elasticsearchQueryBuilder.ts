export interface EsQueryConfig {
  index: string;
  searchTerm: string;
  field: string;
  statusFilter?: string;
}

export function buildElasticsearchQuery(config: EsQueryConfig): string {
  const must: any[] = [];
  if (config.searchTerm) {
    must.push({ match: { [config.field]: config.searchTerm } });
  }
  const filter: any[] = [];
  if (config.statusFilter) {
    filter.push({ term: { status: config.statusFilter } });
  }

  const dsl = {
    query: {
      bool: {
        must: must.length ? must : [{ match_all: {} }],
        filter,
      },
    },
    size: 20,
  };

  return JSON.stringify(dsl, null, 2);
}
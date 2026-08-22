export interface WranglerConfig {
  name: string;
  main: string;
  compatibilityDate: string;
  enableKv?: boolean;
  enableD1?: boolean;
}

export function generateWranglerConfig(config: WranglerConfig): string {
  const obj: any = {
    name: config.name,
    main: config.main,
    compatibility_date: config.compatibilityDate,
  };
  if (config.enableKv) {
    obj.kv_namespaces = [{ binding: 'MY_KV', id: 'xxxxxxxxxxxx' }];
  }
  if (config.enableD1) {
    obj.d1_databases = [{ binding: 'DB', database_name: 'prod-db', database_id: 'xxxx-xxxx' }];
  }
  return JSON.stringify(obj, null, 2);
}
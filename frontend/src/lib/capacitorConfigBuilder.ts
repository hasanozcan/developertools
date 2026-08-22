export interface CapacitorConfigOptions {
  appId: string;
  appName: string;
  webDir?: string;
  bundledWebRuntime?: boolean;
}

export function generateCapacitorConfig(options: CapacitorConfigOptions): string {
  const { appId, appName, webDir = 'out', bundledWebRuntime = false } = options;

  const config = {
    appId: appId || 'com.example.app',
    appName: appName || 'My Capacitor App',
    webDir,
    bundledWebRuntime,
  };

  return JSON.stringify(config, null, 2);
}

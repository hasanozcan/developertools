export interface AndroidManifestConfig {
  packageName: string;
  appName: string;
  permissions: string[];
}

export function buildAndroidManifestXml(config: AndroidManifestConfig): string {
  const { packageName, appName, permissions } = config;

  const permLines = permissions
    .map((p) => `    <uses-permission android:name="android.permission.${p}" />`)
    .join('\n');

  return `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="${packageName || 'com.example.app'}">

${permLines}

    <application
        android:allowBackup="true"
        android:label="${appName || 'My App'}"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.Light.NoActionBar">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;
}

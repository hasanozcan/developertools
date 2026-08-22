export function generateAppleAppSiteAssociation(appId: string, paths: string[]): string {
  const json = {
    applinks: {
      apps: [],
      details: [
        {
          appID: appId || 'TEAMID.com.example.app',
          paths: paths.length > 0 ? paths : ['/tools/*', '/open/*'],
        },
      ],
    },
  };
  return JSON.stringify(json, null, 2);
}

export function generateAssetLinksJson(packageName: string, sha256Fingerprints: string[]): string {
  const json = [
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: packageName || 'com.example.app',
        sha256_cert_fingerprints: sha256Fingerprints.length > 0 ? sha256Fingerprints : ['14:6D:E9:...'],
      },
    },
  ];
  return JSON.stringify(json, null, 2);
}

export function generateHelmChart(chartName = 'my-microservice', version = '0.1.0', appVersion = '1.0.0'): string {
  return 'apiVersion: v2\nname: ' + chartName + '\ndescription: A Helm chart for ' + chartName + '\ntype: application\nversion: ' + version + '\nappVersion: "' + appVersion + '"\n';
}

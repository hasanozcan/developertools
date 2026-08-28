export function generateOpaRegoPolicy(packageName = 'authz', defaultAllow = false): string {
  return 'package ' + packageName + '\n\ndefault allow = ' + (defaultAllow ? 'true' : 'false') + '\n\n# Allow admins unconditional access\nallow {\n    input.user.role == "admin"\n}\n\n# Allow read access to members\nallow {\n    input.action == "read"\n    input.user.role == "member"\n}\n';
}

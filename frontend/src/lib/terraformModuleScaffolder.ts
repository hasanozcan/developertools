export function generateTerraformModule(modName = 'vpc'): Record<string, string> {
  return {
    'main.tf': 'resource "aws_vpc" "main" {\n  cidr_block = var.cidr_block\n}\n',
    'variables.tf': 'variable "cidr_block" {\n  type = string\n  default = "10.0.0.0/16"\n}\n',
    'outputs.tf': 'output "vpc_id" {\n  value = aws_vpc.main.id\n}\n'
  };
}

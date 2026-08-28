export function generatePrismaSeed(modelName = 'user', count = 3): string {
  const records = [];
  for (let i = 1; i <= count; i++) {
    records.push('      { id: ' + i + ', name: "' + modelName + '_' + i + '" }');
  }
  return 'import { PrismaClient } from "@prisma/client";\n\nconst prisma = new PrismaClient();\n\nasync function main() {\n  await prisma.' + modelName.toLowerCase() + '.createMany({\n    data: [\n' + records.join(',\n') + '\n    ]\n  });\n}\n\nmain().finally(() => prisma.$disconnect());\n';
}

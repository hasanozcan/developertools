export function generateFakerSchema(entityName = 'User'): string {
  return 'import { faker } from "@faker-js/faker";\n\nexport function createMock' + entityName + '() {\n  return {\n    id: faker.string.uuid(),\n    name: faker.person.fullName(),\n    email: faker.internet.email(),\n    avatar: faker.image.avatar(),\n    createdAt: faker.date.past()\n  };\n}\n';
}

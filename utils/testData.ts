import { faker } from '@faker-js/faker';

export function validEmail(): string {
  return faker.internet.email({ provider: 'teste.com' }).toLowerCase();
}

export function randomPassword(): string {
  return faker.internet.password({ length: 12, prefix: 'Aa1!' });
}

export function invalidEmail(): string {
  return faker.word.sample();
}

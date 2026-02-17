import { faker } from '@faker-js/faker';

export function generatePetData(overrides = {}) {
  return {
    id: faker.number.int({ min: 100000, max: 999999 }),
    name: faker.animal.dog(),
    status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
    ...overrides
  };
}
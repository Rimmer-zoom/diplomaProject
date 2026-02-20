import { faker } from '@faker-js/faker';

export class PetBuilder {
  constructor() {
    // Значения по умолчанию
    this.pet = {
      id: faker.number.int({ min: 100000, max: 999999 }),
      name: faker.animal.dog(),
      status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
    };
  }

  withId(id) {
    this.pet.id = id;
    return this; 
  }

  withName(name) {
    this.pet.name = name;
    return this;
  }

  withStatus(status) {
    this.pet.status = status;
    return this;
  }

  build() {
    return { ...this.pet }; 
  }
}
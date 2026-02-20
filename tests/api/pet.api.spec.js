import { test, expect } from '../../src/helpers/fixtures/fixturesApi.js';
import { generatePetData } from '../../src/utils/pet.data';
import { PetBuilder } from '../../src/helpers/builders/index.builder';


test.describe('Petstore API - Functional tests', () => {

  test('создать нового питомца', async ({ petService }) => {
    

    const pet = new PetBuilder().withStatus('available').build();

    const response = await petService.createPet(pet);
    //console.log('URL:', response.url());
    //console.log('STATUS:', response.status());
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(pet.id);
    expect(body.name).toBe(pet.name);
    expect(body.status).toBe('available');
  });

  test('получить существующего питомца по ID', async ({ petService }) => {
    

    const pet = new PetBuilder().build();
    await petService.createPet(pet);

    const response = await petService.getPet(pet.id);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(pet.id);
  });

  test('обновить статус питомца на "sold"', async ({ petService }) => {
    

    const pet = new PetBuilder().withStatus('available').build();
    await petService.createPet(pet);

    pet.status = 'sold';
    const response = await petService.updatePet(pet);
    expect(response.status()).toBe(200);

    const updatedPet = await response.json();
    expect(updatedPet.status).toBe('sold');
  });

  test('удалить существующего питомца', async ({ petService }) => {
    

    const pet = new PetBuilder().build();
    await petService.createPet(pet);

    const deleteResponse = await petService.deletePet(pet.id);
    expect(deleteResponse.status()).toBe(200);

    const getResponse = await petService.getPet(pet.id);
    expect(getResponse.status()).toBe(404);
  });

  test('вернуть список питомцев, отфильтрованных по статусу', async ({ petService }) => {
    

    const pet = new PetBuilder().withStatus('pending').build();
    await petService.createPet(pet);

    const response = await petService.findByStatus('pending');
    expect(response.status()).toBe(200);

    const pets = await response.json();
    expect(Array.isArray(pets)).toBeTruthy();
    expect(pets.some(p => p.id === pet.id)).toBeTruthy();
  });

});
import { test as base, expect } from '@playwright/test';
import { PetService } from '../../services/pet.service';

export const test = base.extend({
  petService: async ({}, use, testInfo) => {
    const apiBaseURL = testInfo.config.projects[1].use.baseURL;
    const service = new PetService(apiBaseURL);
    await use(service);
  }
});

export { expect };
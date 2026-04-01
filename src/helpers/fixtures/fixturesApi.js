/*import { test as base, expect } from '@playwright/test';
import { PetService } from '../../services/pet.service';

export const test = base.extend({
  petService: async ({}, use, testInfo) => {
    const apiBaseURL = testInfo.config.projects[1].use.baseURL;
    const service = new PetService(apiBaseURL);
    await use(service);
    await service.close();
  }
});

export { expect }; */

import { test as base, expect } from '@playwright/test';
import { PetService } from '../../services/pet.service';

export const test = base.extend({
  petService: async ({}, use, testInfo) => {
    // Находим проект с именем 'api'
    const apiProject = testInfo.config.projects.find(
      project => project.name === 'api'
    );
    
    const apiBaseURL = apiProject?.use?.baseURL || 'https://petstore.swagger.io/v2';
    
    const service = new PetService(apiBaseURL);
    await use(service);
    await service.close();
  }
});

export { expect };
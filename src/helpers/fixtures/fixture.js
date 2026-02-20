import { test as base } from '@playwright/test';
import { App } from '../../pages/app.page';

export const test = base.extend({
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },
});

export const expect = test.expect;
/*import { test as base } from '@playwright/test';


export const test = base.extend({
  petService: async ({}, use, testInfo) => {
    // берём baseURL из проекта, в котором запускается тест
    const baseURL = testInfo.project.use.baseURL;
    const service = new PetService(baseURL);
    await use(service);
  }
});*/
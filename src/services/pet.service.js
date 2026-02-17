import { request } from '@playwright/test';

export class PetService {
  constructor() {
    this.baseURL = 'https://petstore.swagger.io/v2';
    this.apiContext = null;
  }

  async init() {
    if (!this.apiContext) {
      this.apiContext = await request.newContext({
        extraHTTPHeaders: { 'Content-Type': 'application/json' },
        timeout: 60000,
      });
    }
  }

  async createPet(petData) {
    await this.init();
    // полный URL, baseURL больше не нужен
    return this.apiContext.post(`${this.baseURL}/pet`, { data: petData });
  }

  async getPet(petId) {
    await this.init();
    return this.apiContext.get(`${this.baseURL}/pet/${petId}`);
  }

  async updatePet(petData) {
    await this.init();
    return this.apiContext.put(`${this.baseURL}/pet`, { data: petData });
  }

  async deletePet(petId) {
    await this.init();
    return this.apiContext.delete(`${this.baseURL}/pet/${petId}`);
  }

  async findByStatus(status) {
    await this.init();
    return this.apiContext.get(`${this.baseURL}/pet/findByStatus?status=${status}`);
  }

  async dispose() {
    if (this.apiContext) await this.apiContext.dispose();
  }
}
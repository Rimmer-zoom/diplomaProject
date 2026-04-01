import { request } from '@playwright/test';

export class PetService {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.apiContext = null;
  }

  async ensureContext() {
    if (!this.apiContext) {
      this.apiContext = await request.newContext({
        extraHTTPHeaders: { 'Content-Type': 'application/json' },
        timeout: 60000,
      });
    }
    return this.apiContext;
  }

  async createPet(petData) {
    const context = await this.ensureContext();
    return context.post(`${this.baseURL}/pet`, { data: petData });
  }

  async getPet(petId) {
    const context = await this.ensureContext();
    return context.get(`${this.baseURL}/pet/${petId}`);
  }

  async updatePet(petData) {
    const context = await this.ensureContext();
    return context.put(`${this.baseURL}/pet`, { data: petData });
  }

  async deletePet(petId) {
    const context = await this.ensureContext();
    return context.delete(`${this.baseURL}/pet/${petId}`);
  }

  async findByStatus(status) {
    const context = await this.ensureContext();
    return context.get(`${this.baseURL}/pet/findByStatus?status=${status}`);
  }

  async close() {
    if (this.apiContext) {
      await this.apiContext.dispose();
      this.apiContext = null;
    }
  }
}
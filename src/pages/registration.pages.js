export class RegistrationPage {
    constructor(page){
        this.page = page;
        this.nameInput = page.getByRole('textbox', { name: 'Your Name' }).describe('Ввести имя');
        this.emailInput = page.getByRole('textbox', { name: 'Email' }).describe('Ввести мэйл');
        this.passwordInput = page.getByRole('textbox', { name: 'Password' }).describe('Ввести пароль');
        this.singupButton = page.getByRole('button', { name: 'Sign up' }).describe('Кнопка Сохранить');
    }
async registration (name, email, password){
    await this.nameInput.waitFor({ state: 'visible' });
    await this.nameInput.click()
    await this.nameInput.fill(name)
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.click()
    await this.emailInput.fill(email)
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.click()
    await this.passwordInput.fill(password)
    await this.singupButton.click()
}

}
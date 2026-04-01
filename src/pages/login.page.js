export class LoginPage {
    constructor(page){
        this.page = page;
        this.emailinput = page.getByRole('textbox', { name: 'Email' });
        this.passwordinput = page.getByRole('textbox', { name: 'Password' });
        this.loginbutton = page.getByRole('button', { name: 'Login' });
    }

async login (email, password){
    
    await this.emailinput.click()
    await this.emailinput.fill(email)
    await this.passwordinput.click()
    await this.passwordinput.fill(password)
    await this.loginbutton.click()
}

}
export class HomePage {
    constructor (page){
      this.page = page;
      this.singupbutton = page.getByRole('link', { name: 'Sign up' });
      this.loginbutton = page.getByRole('link', { name: 'Login' });
      this.profileName = page.locator(".dropdown-toggle").describe('Всплывающее меню профиля')
      this.mainContent = (page.locator('main'));
      this.mainContentnav = (page.locator('nav'));
      this.articleButton = page.getByRole('link', { name: 'New Article' });
      this.homeButton = page.getByRole('link', { name: 'Home' }).waitFor();
        
    }
async goToRegister (){
    await this.page.goto('/register');
    await this.singupbutton.click();
}
async goToLogin (){
    await this.page.goto('/login');
    await this.loginbutton.click();
}    
async goToArticle (){
    
    await this.articleButton.click();

}
}
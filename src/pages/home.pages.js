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
async goToRegister (url){
    await this.page.goto(url);
    await this.singupbutton.click();
}
async goToLogin (url){
    await this.page.goto(url);
    await this.loginbutton.click();
}    
async goToArticle (){
    await this.page.waitForLoadState('networkidle');
    await this.articleButton.waitFor();
    await this.articleButton.click();

}
}
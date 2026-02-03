import {RegistrationPage, HomePage, ProfilePage, ArticlePage, LoginPage, OpenArticlePage, Comment} from './index'
export class App {
    constructor (page) {
        this.page = page;
        this.homePage = new HomePage(page);
        this.registrationPage = new RegistrationPage(page);
        this.profilePage = new ProfilePage(page);
        this.articlePage = new ArticlePage(page);
        this.loginPage = new LoginPage(page);
        this.openArticlePage = new OpenArticlePage(page);
        this.comment = new Comment(page);
    }
}
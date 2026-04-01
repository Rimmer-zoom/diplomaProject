import { faker } from '@faker-js/faker';
import { test, expect } from '../../src/helpers/fixtures/fixture.js';
import { UserBuilder, ArticleBuilder } from '../../src/helpers/builders/index.builder';


const user = new UserBuilder().withEmail().withName().withPassword().build();
const {email, password, name} = user;
const articleData = new ArticleBuilder().withTitle().withDescription().withArticle().withTags().build();
const { title, description, article, tags } = articleData;

test('Регистрация, авторизация и разлогин', async ({ app }) => {
  
  await app.homePage.goToRegister();
  await app.registrationPage.registration(name, email, password); // Регистрация
  
  await app.profilePage.openMenu();
  await app.profilePage.logOut(); //Выход после регистрации
  
  await app.homePage.goToLogin();
  await app.loginPage.login(email, password); // Авторизация
  
  await expect(app.homePage.profileName).toContainText(name); // Проверяем, что пользователь авторизовался
  
  await app.profilePage.openMenu();
  await app.profilePage.logOut();
  await expect(app.homePage.mainContentnav).toContainText('Sign up'); // Выход после авторизации
}); 

test('Применение фильтра', async ({ app } ) => {

    await app.homePage.goToRegister();
    await app.registrationPage.registration(name, email, password);
    await expect(app.homePage.profileName).toContainText(name); 

    
    await app.profilePage.filterSelect();
    await expect(app.profilePage.filter).toBeVisible(); // Фильтр применен
});

test('Создание статьи', async ({ app }) => {

    await app.homePage.goToRegister();
    await app.registrationPage.registration(name, email, password);
    await app.homePage.goToArticle()
    await app.articlePage.addArticle(title, description, article, tags);
    await app.profilePage.openMenu();
    await app.profilePage.goToProfile();
    await expect(app.profilePage.title).toContainText(description); // Успешно добавили cтатью

});

test('Удаление статьи', async ({ app } ) => {
    
    await app.homePage.goToRegister();
    await app.registrationPage.registration(name, email, password);

    await app.homePage.goToArticle()
    await app.articlePage.addArticle(title, description, article, tags);

    await app.profilePage.openMenu();
    await app.profilePage.goToProfile();
    await app.profilePage.openArticle();
    
    await Promise.all([
    app.page.waitForEvent('dialog').then(dialog => {
      expect(dialog.message()).toBe('Want to delete the article?');
      dialog.accept();
    }),
    app.openArticlePage.deleteArticle()
  ]);
    
    await expect(app.profilePage.noArticles).toBeVisible(); // Успешно удалили cтатью
  }
);

test('Добавление комментария к статье', async ({ app }) => {
    
    
    const commentData = new ArticleBuilder().withComment().buildComment();
    const comment = commentData.text;
    
    await app.homePage.goToRegister();
    await app.registrationPage.registration(name, email, password);
    await app.homePage.goToArticle()
    await app.articlePage.addArticle(title, description, article, tags);
    await app.profilePage.openMenu();
    await app.profilePage.goToProfile();
    await app.profilePage.openArticle();
    // Добавляем комментарий к статье
    await app.comment.addComment(comment);

    const commentDataResult = await app.comment.commentData();
    // Проверяем, что комментарий добавлен
    expect(commentDataResult).not.toBeNull();
    expect(commentDataResult.text).toContain(comment);
    expect(commentDataResult.author).toContain(user.name);
    })
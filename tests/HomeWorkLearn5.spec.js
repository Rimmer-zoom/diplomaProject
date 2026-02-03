import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { App } from '../src/pages/app.page';
import { UserBuilder } from '../src/helpers/builders/index.builder'

const url = 'https://realworld.qa.guru/';


const description = faker.lorem.words(4);
const title = faker.lorem.paragraph(4);
const article = faker.lorem.paragraph(6);
const tags = faker.word.adjective(); 
const user = new UserBuilder().withEmail().withName().withPassword().build();
const {email, password, name} = user;

test('Регистрация, авторизация и разлогин', async ({ page }) => {
  const app = new App(page);
  
  await app.homePage.goToRegister(url);
  await app.registrationPage.registration(name, email, password); // Регистрация
  
  await app.profilePage.openMenu();
  await app.profilePage.logOut(); //Выход после регистрации
  
  await app.homePage.goToLogin(url);
  await app.loginPage.login(email, password); // Авторизация
  
  await expect(app.homePage.profileName).toContainText(name); // Проверяем, что пользователь авторизовался
  
  await app.profilePage.openMenu();
  await app.profilePage.logOut();
  await expect(app.homePage.mainContentnav).toContainText('Sign up'); // Выход после авторизации
}); 

test('Применение фильтра', async ({ page } ) => {
    const app = new App(page);

    await app.homePage.goToRegister(url);
    await app.registrationPage.registration(name, email, password);
    await expect(app.homePage.profileName).toContainText(name); 

    
    await app.profilePage.filterSelect();
    await expect(app.profilePage.filter).toBeVisible(); // Фильтр применен
});

test('Создание статьи', async ({ page }) => {
    const app = new App(page);

    await app.homePage.goToRegister(url);
    await app.registrationPage.registration(name, email, password);
    await app.homePage.goToArticle()
    await app.articlePage.addArticle(title, description, article, tags);
    await app.profilePage.openMenu();
    await app.profilePage.goToProfile();
    await expect(app.profilePage.title).toContainText(description); // Успешно добавили cтатью

});

test('Удаление статьи', async ({ page } ) => {
    const app = new App(page);
    await app.homePage.goToRegister(url);
    await app.registrationPage.registration(name, email, password);

    await app.homePage.goToArticle()
    await app.articlePage.addArticle(title, description, article, tags);

    await app.profilePage.openMenu();
    await app.profilePage.goToProfile();
    await app.profilePage.openArticle();
    
    await Promise.all([
    page.waitForEvent('dialog').then(dialog => {
      expect(dialog.message()).toBe('Want to delete the article?');
      dialog.accept();
    }),
    app.openArticlePage.deleteArticle()
  ]);
    
    await expect(app.profilePage.noArticles).toBeVisible(); // Успешно удалили cтатью
  }
);

test('Добавление комментария к статье', async ({ page }) => {
    const app = new App(page);
    const comment = faker.lorem.sentence();
    
    
    await app.homePage.goToRegister(url);
    await app.registrationPage.registration(name, email, password);
    await app.homePage.goToArticle()
    await app.articlePage.addArticle(title, description, article, tags);
    await app.profilePage.openMenu();
    await app.profilePage.goToProfile();
    await app.profilePage.openArticle();
    // Добавляем комментарий к статье
    await app.comment.addComment(comment);

    const commentData = await app.comment.commentData();
    // Проверяем, что комментарий добавлен
    expect(commentData).not.toBeNull();
    expect(commentData.text).toContain(comment);
    expect(commentData.author).toContain(user.name);
    })
import { test, expect } from '../../src/helpers/fixtures/fixture.js';
import { UserBuilder, ArticleBuilder } from '../../src/helpers/builders/index.builder';

test.describe('HomeWorkLearn5 - Tests with isolated data', () => {
  let user;
  let email;
  let password;
  let name;
  let articleData;
  let title;
  let description;
  let article;
  let tags;

  //Создаем свежие данные перед КАЖДЫМ тестом
  test.beforeEach(async () => {
    user = new UserBuilder().withEmail().withName().withPassword().build();
    email = user.email;
    password = user.password;
    name = user.name;
    
    articleData = new ArticleBuilder().withTitle().withDescription().withArticle().withTags().build();
    title = articleData.title;
    description = articleData.description;
    article = articleData.article;
    tags = articleData.tags;
  });

  test('Регистрация, авторизация и разлогин', async ({ app }) => {
    await app.homePage.goToRegister();
    await app.registrationPage.registration(name, email, password);
    
    await app.profilePage.openMenu();
    await app.profilePage.logOut();
    
    await app.homePage.goToLogin();
    await app.loginPage.login(email, password);
    
    await expect(app.homePage.profileName).toContainText(name);
    
    await app.profilePage.openMenu();
    await app.profilePage.logOut();
    await expect(app.homePage.mainContentnav).toContainText('Sign up');
  }); 

  test('Применение фильтра', async ({ app }) => {
    await app.homePage.goToRegister();
    await app.registrationPage.registration(name, email, password);
    await expect(app.homePage.profileName).toContainText(name); 
    
    await app.profilePage.filterSelect();
    await expect(app.profilePage.filter).toBeVisible();
  });

  test('Создание статьи', async ({ app }) => {
    await app.homePage.goToRegister();
    await app.registrationPage.registration(name, email, password);
    await app.homePage.goToArticle();
    await app.articlePage.addArticle(title, description, article, tags);
    await app.profilePage.openMenu();
    await app.profilePage.goToProfile();
    await expect(app.profilePage.title).toContainText(title);
  });

  test('Удаление статьи', async ({ app }) => {
    await app.homePage.goToRegister();
    await app.registrationPage.registration(name, email, password);
    await app.homePage.goToArticle();
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
    
    await expect(app.profilePage.noArticles).toBeVisible();
  });

  test('Добавление комментария к статье', async ({ app }) => {
    const commentData = new ArticleBuilder().withComment().buildComment();
    const comment = commentData.text;
    
    await app.homePage.goToRegister();
    await app.registrationPage.registration(name, email, password);
    await app.homePage.goToArticle();
    await app.articlePage.addArticle(title, description, article, tags);
    await app.profilePage.openMenu();
    await app.profilePage.goToProfile();
    await app.profilePage.openArticle();
    
    await app.comment.addComment(comment);
    
    const commentDataResult = await app.comment.commentData();
    expect(commentDataResult).not.toBeNull();
    expect(commentDataResult.text).toContain(comment);
    expect(commentDataResult.author).toContain(user.name);
  });

  test('Редактирование статьи', async ({ app }) => {
    const updatedArticleData = new ArticleBuilder().withTitle().withDescription().withArticle().withTags().build();
    const { title: updatedTitle, description: updatedDescription, article: updatedArticle, tags: updatedTags } = updatedArticleData;
  
    await app.homePage.goToRegister();
    await app.registrationPage.registration(name, email, password);
    await app.homePage.goToArticle();
    await app.articlePage.addArticle(title, description, article, tags);
    await app.profilePage.openMenu();
    await app.profilePage.goToProfile();
    await app.profilePage.openArticle();
    await app.openArticlePage.editArticle();
  
    await app.articlePage.titleInput.fill(updatedTitle);
    await app.articlePage.aboutInput.fill(updatedDescription);
    await app.articlePage.articleInput.fill(updatedArticle);
    await app.articlePage.tagsInput.fill(updatedTags);
    await app.page.getByRole('button', { name: 'Update Article' }).click();
  
    await expect(app.page.getByRole('heading')).toContainText(updatedTitle);
    await expect(app.page.locator('.article-content p').first()).toContainText(updatedArticle);
  });

  test('Применение тега и поиск статьи по тегу', async ({ app }) => {
    const searchTag = 'реклама';
  
    
    await app.homePage.goToRegister();
    await app.registrationPage.registration(name, email, password);
    await app.page.getByRole('button', { name: searchTag }).click();
    const firstArticle = app.page.getByRole('link').first();
    await firstArticle.click();
    await expect(app.page.locator('.tag-list')).toContainText(searchTag);
  });
  
});
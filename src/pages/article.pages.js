export class ArticlePage {
    constructor(page){
        this.page = page;
        this.titleInput = page.getByPlaceholder('Article Title');
        this.aboutInput = page.getByPlaceholder("What's this article about?");
        this.articleInput = page.getByPlaceholder('Write your article' );
        this.tagsInput = page.getByPlaceholder('Enter tags' );
        this.publishButton = page.getByRole('button', { name: 'Publish Article' });
        this.articlePublish = page.getByRole('container');
    }
async addArticle (title, description, article, tags){
    await this.titleInput.click()
    await this.titleInput.fill(description)
    await this.aboutInput.click()
    await this.aboutInput.fill(title)
    await this.articleInput.click()
    await this.articleInput.fill(article)
    await this.tagsInput.click()
    await this.tagsInput.fill(tags)
    await this.publishButton.click()
}
}


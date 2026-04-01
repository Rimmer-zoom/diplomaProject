export class OpenArticlePage {
    constructor(page) {
        this.page = page;
        this.deleteButton = page.getByRole('button', { name: 'Delete Article' }).first();
        this.editButton = page.getByRole('button', { name: 'Edit Article' }).first();
    
    }

    async deleteArticle() {
        await this.deleteButton.click();
    }

    

    async editArticle() {
        await this.editButton.click();
    }
}
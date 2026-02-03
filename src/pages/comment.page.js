export class Comment{
    constructor(page){
        this.commentInput = page.getByPlaceholder('Write a comment...'); 
        this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
        this.commentTextLocator = page.locator('.card-block p.card-text');
        this.commentFooterLocator = page.locator('.card-footer');
    }
        
async addComment(commentText){
        // Заполняем поле для ввода комментария
        await this.commentInput.fill(commentText);

        
        await this.postCommentButton.click();

        // Ожидание появления комментария
        const commentLocator = this.commentTextLocator.filter({ hasText: commentText });
        await commentLocator.waitFor({ state: 'visible' });
}
    

async commentData(commentText) {
        
        
        const commentTextLocator = this.commentTextLocator.filter({ hasText: commentText });
        
        // Проверка появления комментария
        try {
            await commentTextLocator.waitFor({ state: 'visible', timeout: 5000 });
        } catch (error) {
            return null;
        }
        
        const text = await commentTextLocator.textContent();
        
        // Автор комментария
        const commentCard = commentTextLocator.locator('..').locator('..');
        const authorLocator = commentCard.locator(this.commentFooterLocator);
        const author = await authorLocator.textContent();
        
        return {
            text: text ? text.trim() : '',
            author: author ? author.trim() : ''
        };
    }
}
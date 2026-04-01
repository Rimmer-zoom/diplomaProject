import { faker } from '@faker-js/faker';

export class ArticleBuilder {
    constructor() {
        this.title = null;
        this.description = null;
        this.article = null;
        this.tags = null;
        this.commentText = null;
    }

    withTitle(title) {
        this.title = title ?? faker.lorem.sentence({ min: 3, max: 8 });
        return this;
    }

    withDescription(description) {
        this.description = description ?? faker.lorem.sentence({ min: 10, max: 20 });
        return this;
    }

    withArticle(article) {
        this.article = article ?? faker.lorem.paragraphs({ min: 2, max: 5 });
        return this;
    }

    withTags(tags) {
        if (tags) {
            this.tags = Array.isArray(tags) ? tags.join(', ') : tags;
        } else {
            this.tags = faker.word.adjective();
        }
        return this;
    }

    addTag(tag) {
        if (this.tags) {
            this.tags = this.tags + ', ' + (tag ?? faker.word.adjective());
        } else {
            this.tags = tag ?? faker.word.adjective();
        }
        return this;
    }

    withComment(comment) {
        this.commentText = comment ?? faker.lorem.sentence({ min: 5, max: 15 });
        return this;
    }

    build() {
        return {
            title: this.title,
            description: this.description,
            article: this.article,
            tags: this.tags
        };
    }

    buildComment() {
        return {
            text: this.commentText
        };
    }
}
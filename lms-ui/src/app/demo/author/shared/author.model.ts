export class Author {
    id: number;
    BookId: number;
    AuthorName: string;

    constructor(author) {        
        this.id = author.id;
        this.BookId = author.BookId;
        this.AuthorName = author.AuthorName;
    }

}

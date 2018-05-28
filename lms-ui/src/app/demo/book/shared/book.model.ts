export class Book {
    id: number;
    Title: string;
    PublisherName: string;

    constructor(book) {        
        this.id = book.id;
        this.Title = book.Title;
        this.PublisherName = book.PublisherName;
    }

}

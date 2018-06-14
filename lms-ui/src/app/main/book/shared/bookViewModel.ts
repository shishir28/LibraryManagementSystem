export class BookViewModel {
    id: number;
    Title: string;
    PublisherId: number;
    PublisherName: string;

    constructor(book) {        
        this.id = book.id;
        this.Title = book.Title;
        this.PublisherId = book.PublisherId;
        this.PublisherName = book.PublisherName;
    }
}

export class AuthorViewModel {
    id: number;
    
    AuthorName: string;

    constructor(author) {        
        this.id = author.id;
    
        this.AuthorName = author.AuthorName;
    }

}


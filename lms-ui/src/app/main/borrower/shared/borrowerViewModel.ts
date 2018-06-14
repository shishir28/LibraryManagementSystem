export class BorrowerViewModel {
    id: number;
    Name: string;
    Address: string;
    Phone: string;
    constructor(borrower) {        
        this.id = borrower.id;
        this.Name = borrower.Name;
        this.Address = borrower.Address;
		this.Phone = borrower.Phone;
    }

}

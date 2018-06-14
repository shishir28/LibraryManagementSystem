export class PublisherViewModel {
    id: number;
    Name: string;
    Address: string;
    Phone: string;
    constructor(publisher) {        
        this.id = publisher.id;
        this.Name = publisher.Name;
        this.Address = publisher.Address;
		this.Phone = publisher.Phone;
    }
}
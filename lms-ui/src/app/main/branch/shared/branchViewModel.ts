export class BranchViewModel {
    id: number;
    BranchName: string;
    Address: string;   
    constructor(branch) {        
        this.id = branch.id;
        this.BranchName = branch.BranchName;
        this.Address = branch.Address;	
    }
}
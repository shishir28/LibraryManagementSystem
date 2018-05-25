import * as express from "express";
import { BorrowerRepository } from '../persistence/borrower.repository';
import { borrower } from "../domain/borrower";

export class BorrowerService {

    private borrowerRepository: BorrowerRepository;
    constructor() {
        this.borrowerRepository = new BorrowerRepository();
    }

    async createBorrower(borrowerData: borrower): Promise<any> {
        return await this.borrowerRepository.Insert(borrowerData);
    }

    async updateBorrower(borrowerData: borrower): Promise<any> {
        return await this.borrowerRepository.Update(borrowerData.id, borrowerData);
    }

    async getBorrower(borrowerId: number):  Promise<borrower> {
        return await this.borrowerRepository.GetById(borrowerId);
    }

    async getAllBorrowers(): Promise<borrower[]> {
        return await this.borrowerRepository.ListAll();
    }

    deleteBorrower(borrowerId: number): void {
        this.borrowerRepository.Delete(borrowerId);
    }
}
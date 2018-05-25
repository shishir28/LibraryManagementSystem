import * as express from "express";
import { BranchRepository } from '../persistence/Branch.repository';
import { branch } from "../domain/branch";

export class BranchService {

    private branchRepository: BranchRepository;
    constructor() {
        this.branchRepository = new BranchRepository();
    }

    async createBranch(branchData: branch): Promise<any> {
        return await this.branchRepository.Insert(branchData);
    }

    async updateBranch(branchData: branch): Promise<any> {
        return await this.branchRepository.Update(branchData.id, branchData);
    }

    async getBranch(branchId: number):  Promise<branch> {
        return await this.branchRepository.GetById(branchId);
    }

    async getAllBranches(): Promise<branch[]> {
        return await this.branchRepository.ListAll();
    }

    deleteBranch(branchId: number): void {
        this.branchRepository.Delete(branchId);
    }
}
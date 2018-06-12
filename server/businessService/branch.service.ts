import * as express from "express";
import { BranchRepository } from '../persistence/branch.repository';
import { Branch } from "../domain/Branch";
import { logger } from '../infrastructure/logger';

export class BranchService {

    private branchRepository: BranchRepository;
    constructor() {
        this.branchRepository = new BranchRepository();
    }

    async createBranch(branchData: Branch): Promise<Branch> {
        let promise = new Promise<Branch>((resolve: Function, reject: Function) => {
            return this.branchRepository.Insert(branchData).then((branchInstance: Branch) => {
                resolve(branchInstance);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }

    async updateBranch(branchData: Branch): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve: Function, reject: Function) => {
            return this.branchRepository.Update(branchData.id, branchData).then((updated: Boolean) => {
                resolve(updated);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }

    async getBranch(branchId: number): Promise<Branch> {
        let promise = new Promise<Branch>((resolve: Function, reject: Function) => {
            return this.branchRepository.GetById(branchId)
                .then((branchInstance: Branch) => {
                    resolve(branchInstance);
                }).catch((error: Error) => {
                    logger.error(error.message);
                    reject(error);
                });
        });
        return promise;
    }

    async getAllBranches(): Promise<Branch[]> {
        let promise = new Promise<Branch[]>((resolve: Function, reject: Function) => {
            return this.branchRepository.ListAll()
                .then((branchs: Branch[]) => {
                    resolve(branchs);
                }).catch((error: Error) => {
                    logger.error(error.message);
                    reject(error);
                });
        });
        return promise;
    }

    async deleteBranch(branchId: number): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve: Function, reject: Function) => {
            return this.branchRepository.Delete(branchId).then((updated: Boolean) => {
                resolve(updated);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }
}
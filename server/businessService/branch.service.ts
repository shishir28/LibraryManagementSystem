import * as express from "express";
import { BranchRepository } from '../persistence/branch.repository';
import { branch } from "../domain/branch";
import { logger } from '../infrastructure/logger';

export class BranchService {

    private branchRepository: BranchRepository;
    constructor() {
        this.branchRepository = new BranchRepository();
    }

    async createBranch(branchData: branch): Promise<branch> {
        let promise = new Promise<branch>((resolve: Function, reject: Function) => {
            return this.branchRepository.Insert(branchData).then((branchInstance: branch) => {
                resolve(branchInstance);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }

    async updateBranch(branchData: branch): Promise<Boolean> {
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

    async getBranch(branchId: number): Promise<branch> {
        let promise = new Promise<branch>((resolve: Function, reject: Function) => {
            return this.branchRepository.GetById(branchId)
                .then((branchInstance: branch) => {
                    resolve(branchInstance);
                }).catch((error: Error) => {
                    logger.error(error.message);
                    reject(error);
                });
        });
        return promise;
    }

    async getAllBranches(): Promise<branch[]> {
        let promise = new Promise<branch[]>((resolve: Function, reject: Function) => {
            return this.branchRepository.ListAll()
                .then((branchs: branch[]) => {
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
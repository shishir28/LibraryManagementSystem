import * as express from "express";
import { BorrowerRepository } from '../persistence/borrower.repository';
import { borrower } from "../domain/borrower";
import { logger } from '../infrastructure/logger';

export class BorrowerService {

    private borrowerRepository: BorrowerRepository;
    constructor() {
        this.borrowerRepository = new BorrowerRepository();
    }

    async createBorrower(borrowerData: borrower): Promise<borrower> {
        let promise = new Promise<borrower>((resolve: Function, reject: Function) => {
            return this.borrowerRepository.Insert(borrowerData).then((borrowerInstance: borrower) => {
                resolve(borrowerInstance);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }

    async updateBorrower(borrowerData: borrower): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve: Function, reject: Function) => {
            return this.borrowerRepository.Update(borrowerData.id, borrowerData).then((updated: Boolean) => {
                resolve(updated);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }

    async getBorrower(borrowerId: number): Promise<borrower> {
        let promise = new Promise<borrower>((resolve: Function, reject: Function) => {
            return this.borrowerRepository.GetById(borrowerId)
                .then((borrowerInstance: borrower) => {
                    resolve(borrowerInstance);
                }).catch((error: Error) => {
                    logger.error(error.message);
                    reject(error);
                });
        });
        return promise;
    }

    async getAllBorrowers(): Promise<borrower[]> {
        let promise = new Promise<borrower[]>((resolve: Function, reject: Function) => {
            return this.borrowerRepository.ListAll()
                .then((borrowers: borrower[]) => {
                    resolve(borrowers);
                }).catch((error: Error) => {
                    logger.error(error.message);
                    reject(error);
                });
        });
        return promise;
    }

    async deleteBorrower(borrowerId: number): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve: Function, reject: Function) => {
            return this.borrowerRepository.Delete(borrowerId).then((updated: Boolean) => {
                resolve(updated);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }
}
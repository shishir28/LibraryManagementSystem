import * as express from "express";
import { PublisherRepository } from '../persistence/publisher.repository';
import { publisher } from "../domain/publisher";
import { logger } from '../infrastructure/logger';

export class PublisherService {

    private publisherRepository: PublisherRepository;
    constructor() {
        this.publisherRepository = new PublisherRepository();
    }

    async createPublisher(publisherData: publisher): Promise<publisher> {
        let promise = new Promise<publisher>((resolve: Function, reject: Function) => {
            return this.publisherRepository.Insert(publisherData).then((publisherInstance: publisher) => {
                resolve(publisherInstance);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }

    async updatePublisher(publisherData: publisher): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve: Function, reject: Function) => {
            return this.publisherRepository.Update(publisherData.id, publisherData).then((updated: Boolean) => {
                resolve(updated);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }

    async getPublisher(publisherId: number): Promise<publisher> {
        let promise = new Promise<publisher>((resolve: Function, reject: Function) => {
            return this.publisherRepository.GetById(publisherId)
                .then((publisherInstance: publisher) => {
                    resolve(publisherInstance);
                }).catch((error: Error) => {
                    logger.error(error.message);
                    reject(error);
                });
        });
        return promise;
    }

    async getAllPublishers(): Promise<publisher[]> {
        let promise = new Promise<publisher[]>((resolve: Function, reject: Function) => {
            return this.publisherRepository.ListAll()
                .then((publishers: publisher[]) => {
                    resolve(publishers);
                }).catch((error: Error) => {
                    logger.error(error.message);
                    reject(error);
                });
        });
        return promise;
    }

    async deletePublisher(publisherId: number): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve: Function, reject: Function) => {
            return this.publisherRepository.Delete(publisherId).then((updated: Boolean) => {
                resolve(updated);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }
}
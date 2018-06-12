import * as express from "express";
import { PublisherRepository } from '../persistence/publisher.repository';
import { Publisher } from "../domain/Publisher";
import { logger } from '../infrastructure/logger';

export class PublisherService {

    private publisherRepository: PublisherRepository;
    constructor() {
        this.publisherRepository = new PublisherRepository();
    }
    
    async createPublisher(publisherData: Publisher): Promise<Publisher> {
        let promise = new Promise<Publisher>((resolve: Function, reject: Function) => {
            return this.publisherRepository.Insert(publisherData).then((publisherInstance: Publisher) => {
                resolve(publisherInstance);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }

    async updatePublisher(publisherData: Publisher): Promise<Boolean> {
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

    async getPublisher(publisherId: number): Promise<Publisher> {
        let promise = new Promise<Publisher>((resolve: Function, reject: Function) => {
            return this.publisherRepository.GetById(publisherId)
                .then((publisherInstance: Publisher) => {
                    resolve(publisherInstance);
                }).catch((error: Error) => {
                    logger.error(error.message);
                    reject(error);
                });
        });
        return promise;
    }

    async getAllPublishers(): Promise<Publisher[]> {
        let promise = new Promise<Publisher[]>((resolve: Function, reject: Function) => {
            return this.publisherRepository.ListAll()
                .then((publishers: Publisher[]) => {
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
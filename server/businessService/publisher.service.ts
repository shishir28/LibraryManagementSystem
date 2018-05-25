import * as express from "express";
import { PublisherRepository } from '../persistence/publisher.repository';
import { publisher } from "../domain/publisher";

export class PublisherService {

    private publisherRepository: PublisherRepository;
    constructor() {
        this.publisherRepository = new PublisherRepository();
    }

    async createPublisher(publisherData: publisher): Promise<any> {
        return await this.publisherRepository.Insert(publisherData);
    }

    async updatePublisher(publisherData: publisher): Promise<any> {
        return await this.publisherRepository.Update(publisherData.id, publisherData);
    }

    async getPublisher(publisherId: number):  Promise<publisher> {
        return await this.publisherRepository.GetById(publisherId);
    }

    async getAllPublishers(): Promise<publisher[]> {
        return await this.publisherRepository.ListAll();
    }

    deletePublisher(publisherId: number): void {
        this.publisherRepository.Delete(publisherId);
    }
}
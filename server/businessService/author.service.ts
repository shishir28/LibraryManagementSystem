import * as express from "express";
import { AuthorRepository } from '../persistence/author.repository';
import { author } from "../domain/author";
import { logger } from '../infrastructure/logger';

export class AuthorService {

    private authorRepository: AuthorRepository;
    constructor() {
        this.authorRepository = new AuthorRepository();
    }

    async createAuthor(authorData: author): Promise<author> {
        let promise = new Promise<author>((resolve: Function, reject: Function) => {
            return this.authorRepository.Insert(authorData).then((authorInstance: author) => {
                resolve(authorInstance);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }

    async updateAuthor(authorData: author): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve: Function, reject: Function) => {
            return this.authorRepository.Update(authorData.id, authorData).then((updated: Boolean) => {
                resolve(updated);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }

    async getAuthor(authorId: number): Promise<author> {
        let promise = new Promise<author>((resolve: Function, reject: Function) => {
            return this.authorRepository.GetById(authorId)
                .then((authorInstance: author) => {
                    resolve(authorInstance);
                }).catch((error: Error) => {
                    logger.error(error.message);
                    reject(error);
                });
        });
        return promise;
    }

    async getAllAuthors(): Promise<author[]> {
        let promise = new Promise<author[]>((resolve: Function, reject: Function) => {
            return this.authorRepository.ListAll()
                .then((authors: author[]) => {
                    resolve(authors);
                }).catch((error: Error) => {
                    logger.error(error.message);
                    reject(error);
                });
        });
        return promise;
    }

    async deleteAuthor(authorId: number): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve: Function, reject: Function) => {
            return this.authorRepository.Delete(authorId).then((updated: Boolean) => {
                resolve(updated);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }
}
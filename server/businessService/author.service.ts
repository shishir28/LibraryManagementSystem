import * as express from "express";
import { AuthorRepository } from '../persistence/author.repository';
import { Author } from "../domain/Author";
import { logger } from '../infrastructure/logger';

export class AuthorService {

    private authorRepository: AuthorRepository;
    constructor() {
        this.authorRepository = new AuthorRepository();
    }

    async createAuthor(authorData: Author): Promise<Author> {
        let promise = new Promise<Author>((resolve: Function, reject: Function) => {
            return this.authorRepository.Insert(authorData).then((authorInstance: Author) => {
                resolve(authorInstance);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }

    async updateAuthor(authorData: Author): Promise<Boolean> {
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

    async getAuthor(authorId: number): Promise<Author> {
        let promise = new Promise<Author>((resolve: Function, reject: Function) => {
            return this.authorRepository.GetById(authorId)
                .then((authorInstance: Author) => {
                    resolve(authorInstance);
                }).catch((error: Error) => {
                    logger.error(error.message);
                    reject(error);
                });
        });
        return promise;
    }

    async getAllAuthors(): Promise<Author[]> {
        let promise = new Promise<Author[]>((resolve: Function, reject: Function) => {
            return this.authorRepository.ListAll()
                .then((authors: Author[]) => {
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
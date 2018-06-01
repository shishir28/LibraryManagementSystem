import * as express from "express";
import { BookRepository } from '../persistence/book.repository';
import { book } from "../domain/book";
import { logger } from '../infrastructure/logger';

export class BookService {

    private bookRepository: BookRepository;
    constructor() {
        this.bookRepository = new BookRepository();
    }

    async createBook(bookData: book): Promise<book> {
        let promise = new Promise<book>((resolve: Function, reject: Function) => {
            return this.bookRepository.Insert(bookData).then((bookInstance: book) => {
                resolve(bookInstance);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }

    async updateBook(bookData: book): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve: Function, reject: Function) => {
            return this.bookRepository.Update(bookData.id, bookData).then((updated: Boolean) => {
                resolve(updated);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }

    async getBook(bookId: number): Promise<book> {
        let promise = new Promise<book>((resolve: Function, reject: Function) => {
            return this.bookRepository.GetById(bookId)
                .then((bookInstance: book) => {
                    resolve(bookInstance);
                }).catch((error: Error) => {
                    logger.error(error.message);
                    reject(error);
                });
        });
        return promise;
    }

    async getAllBooks(): Promise<book[]> {
        let promise = new Promise<book[]>((resolve: Function, reject: Function) => {
            return this.bookRepository.ListAll()
                .then((books: book[]) => {
                    resolve(books);
                }).catch((error: Error) => {
                    logger.error(error.message);
                    reject(error);
                });
        });
        return promise;
    }

    async deleteBook(bookId: number): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve: Function, reject: Function) => {
            return this.bookRepository.Delete(bookId).then((updated: Boolean) => {
                resolve(updated);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }
}
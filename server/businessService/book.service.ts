import * as express from "express";
import { BookRepository } from '../persistence/book.repository';
import { Book } from "../domain/Book";
import { logger } from '../infrastructure/logger';

export class BookService {

    private bookRepository: BookRepository;
    constructor() {
        this.bookRepository = new BookRepository();
    }

    async createBook(bookData: Book): Promise<Book> {
        let promise = new Promise<Book>((resolve: Function, reject: Function) => {
            return this.bookRepository.Insert(bookData).then((bookInstance: Book) => {
                resolve(bookInstance);
            }).catch((error: Error) => {
                logger.error(error.message);
                reject(error);
            });
        });
        return promise;
    }

    async updateBook(bookData: Book): Promise<Boolean> {
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

    async getBook(bookId: number): Promise<Book> {
        let promise = new Promise<Book>((resolve: Function, reject: Function) => {
            return this.bookRepository.GetById(bookId)
                .then((bookInstance: Book) => {
                    resolve(bookInstance);
                }).catch((error: Error) => {
                    logger.error(error.message);
                    reject(error);
                });
        });
        return promise;
    }

    async getAllBooks(): Promise<Book[]> {
        let promise = new Promise<Book[]>((resolve: Function, reject: Function) => {
            return this.bookRepository.ListAlBooksWithPublisher()
                .then((books: Book[]) => {
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
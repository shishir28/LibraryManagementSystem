import * as express from "express";
import { BookRepository } from '../persistence/book.repository';
import { book } from "../domain/book";

export class BookService {

    private bookRepository: BookRepository;
    constructor() {
        this.bookRepository = new BookRepository();
    }

    async createBook(bookData: book): Promise<any> {
        return await this.bookRepository.Insert(bookData);
    }

    async updateBook(bookData: book): Promise<any> {
        return await this.bookRepository.Update(bookData.id, bookData);
    }

    async getBook(bookId: number):  Promise<book> {
        return await this.bookRepository.GetById(bookId);
    }

    async getAllBooks(): Promise<book[]> {
        return await this.bookRepository.ListAll();
    }

    deleteBook(bookId: number): void {
        this.bookRepository.Delete(bookId);
    }
}
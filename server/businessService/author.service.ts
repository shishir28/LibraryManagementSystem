import * as express from "express";
import { AuthorRepository } from '../persistence/author.repository';
import { author } from "../domain/author";

export class AuthorService {

    private authorRepository: AuthorRepository;
    constructor() {
        this.authorRepository = new AuthorRepository();
    }

    async createAuthor(authorData: author): Promise<any> {
        return await this.authorRepository.Insert(authorData);
    }

    async updateAuthor(authorData: author): Promise<any> {
        return await this.authorRepository.Update(authorData.id, authorData);
    }

    async getAuthor(authorId: number):  Promise<author> {
        return await this.authorRepository.GetById(authorId);
    }

    async getAllAuthors(): Promise<author[]> {
        return await this.authorRepository.ListAll();
    }

    deleteAuthor(authorId: number): void {
        this.authorRepository.Delete(authorId);
    }
}
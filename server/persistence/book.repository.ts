import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { Book } from '../domain/Book';
import { BaseRepository } from './BaseRepository';
import { Publisher } from "../domain/Publisher";

export class BookRepository extends BaseRepository<Book>{
    constructor() {
        super(Book);
    }

    async ListAlBooksWithPublisher(): Promise<Book[]> {
        return await Book.findAll({
            attributes: ['id', 'Title', 'PublisherId'],
            include: [
                {
                    model: Publisher
                }
            ]
        })
            .then((data: any) => {
                return data;
            });
    }
    
}
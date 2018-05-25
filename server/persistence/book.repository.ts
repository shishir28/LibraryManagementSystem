import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { book } from '../domain/book';
import { BaseRepository } from './BaseRepository';

export class BookRepository extends BaseRepository<book>{
    constructor() {
        super(book);
    }
}
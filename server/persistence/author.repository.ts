import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { Author } from '../domain/Author';
import { BaseRepository } from './BaseRepository';

export class AuthorRepository extends BaseRepository<Author>{
    constructor() {
        super(Author);
    }
}
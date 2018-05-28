import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { author } from '../domain/author';
import { BaseRepository } from './BaseRepository';

export class AuthorRepository extends BaseRepository<author>{
    constructor() {
        super(author);
    }
}
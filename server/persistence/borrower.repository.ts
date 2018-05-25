import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { borrower } from '../domain/borrower';
import { BaseRepository } from './BaseRepository';

export class BorrowerRepository extends BaseRepository<borrower>{
    constructor() {
        super(borrower);
    }
}
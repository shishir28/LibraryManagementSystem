import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { Borrower } from '../domain/Borrower';
import { BaseRepository } from './BaseRepository';

export class BorrowerRepository extends BaseRepository<Borrower>{
    constructor() {
        super(Borrower);
    }
}
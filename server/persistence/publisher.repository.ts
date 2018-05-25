import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { publisher } from '../domain/publisher';
import { BaseRepository } from './BaseRepository';

export class PublisherRepository extends BaseRepository<publisher>{
    constructor() {
        super(publisher);
    }
}

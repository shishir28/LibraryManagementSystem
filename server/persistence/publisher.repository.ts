import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { Publisher } from '../domain/Publisher';
import { BaseRepository } from './BaseRepository';

export class PublisherRepository extends BaseRepository<Publisher>{
    constructor() {
        super(Publisher);
    }
}

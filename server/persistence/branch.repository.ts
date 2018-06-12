import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { Branch } from '../domain/Branch';
import { BaseRepository } from './BaseRepository';

export class BranchRepository extends BaseRepository<Branch>{
    constructor() {
        super(Branch);
    }
}
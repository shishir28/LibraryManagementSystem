import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { branch } from '../domain/branch';
import { BaseRepository } from './BaseRepository';

export class BranchRepository extends BaseRepository<branch>{
    constructor() {
        super(branch);
    }
}
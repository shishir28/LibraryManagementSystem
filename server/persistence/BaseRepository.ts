import { Sequelize, Model } from 'sequelize-typescript';
import { IBaseRepository } from './IBaseRepository';
import { DBContext } from './dbContext';

export abstract class BaseRepository<T> implements IBaseRepository<T>{
    private _model: any;
    private connection: any;
    private dbContext: DBContext;

    constructor(model: any) {
        this.dbContext = new DBContext();
        this._model = model;
    }

    async GetById(identifier: number): T {
        let result = await this._model.findById(identifier);
        if (result) {
            return result.dataValues;
        } else {
            return result;
        }
    }

    async ListAll(): T[] {
        let result = await this._model.findAll();
        return result.map(y => y.dataValues);
    }

    async Insert(model: T): T {
        let result = await this._model.create(model.dataValues);
        return result.dataValues;
    }

    Delete(identifier: number): Boolean {
        return true;
    }

    async Update(identifier: number, model: T): Boolean {
        let existingRecord = await this._model.findById(identifier);
        // check if record exist because upsert can silently insert the record 
        if (existingRecord && existingRecord.dataValues && existingRecord.dataValues.id == identifier) {
            let result = await this._model.upsert(model.dataValues);
            return (!result);
        } else {
            // let result = await (new Promise<boolean>(resolve => { return resolve(false); }));    
            return (false);
        }
    }
}
import { DBContext } from './dbContext';
import { IBaseRepository } from './IBaseRepository';
import { Sequelize, Model } from 'sequelize-typescript';
import { logger } from '../infrastructure/logger';

export abstract class BaseRepository<T> implements IBaseRepository<T>{
    private _model: any;
    private connection: any;
    private dbContext: DBContext;

    constructor(model: any) {
        this.dbContext = new DBContext();
        this._model = model;
    }

    async GetById(identifier: number): Promise<T> {
        return this._model.findOne({ where: { id: identifier } })
            .then((entity: any) => {
                if (entity) {
                    logger.info(`Retrieved entity with Id ${identifier}.`);
                    return entity.dataValues;
                } else {
                    logger.info(`Retrieved entity with Id ${identifier} does not exist.`);
                    return entity;
                }
            });
    }

    async ListAll(): Promise<T[]> {
        return this._model.findAll()
            .then((entities: Array<any>) => {
                logger.info("Retrieved all Entitites.");
                return entities.map(y => y.dataValues);
            });
    }

    async Insert(model: T): Promise<T> {
        return this._model.create(model.dataValues).then((entity: any) => {
            logger.info(`Created entity with id ${entity.dataValues.id}.`);
            return entity.dataValues;
        });
    }

    async Delete(identifier: number): Promise<Boolean> {
        return this._model.destroy({ where: { id: identifier } }).then((afffectedRows: number) => {
            if (afffectedRows > 0) {
                logger.info(`Deleted Model with Id ${identifier}`);
                return true;
            } else {
                logger.info(`Model with Id ${name} does not exist.`);
            }
            return false;
        });
    }

    async Update(identifier: number, model: T): Promise<Boolean> {
        return this._model.update(model.dataValues, { where: { id: identifier } })
            .then((results: [number, Array[T]]) => {
                if (results.length > 0) {
                    logger.info(`Updated model with id ${identifier}.`);
                } else {
                    logger.info(`Updated model with id ${identifier} does not exist.`);
                }
                return (results.length > 0);
            });
    }
}
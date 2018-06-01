import { Model } from "sequelize-typescript";

export interface IBaseRepository<T> {
    GetById(identifier: number): Promise<T>;
    ListAll(): Promise<T[]>;
    Insert(model: T): Promise<T>;
    Delete(identifier: number): Promise<Boolean>;
    Update(identifier: number, model: T): Promise<Boolean>;
}
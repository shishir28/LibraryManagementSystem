import { Model } from "sequelize-typescript";

export interface IBaseRepository<T>{
    GetById(identifier: number): T;
    ListAll() :  T[];
    Insert(model : T): T;
    Delete(identifier : number) : Boolean;
    Update(identifier:number ,model : T): Boolean;
}
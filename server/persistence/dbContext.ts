import { Sequelize } from 'sequelize-typescript';
import * as Tedious from "tedious";
import * as path from "path";

export class DBContext {

    public dbConfig: Sequelize;

    constructor() {

        const modalDir = path.join(path.resolve(__dirname, '../domain'));
        this.dbConfig = new Sequelize({
            dialect: 'mssql',
            host: process.env.DBSERVER || 'LT-5CG6414XQD',
            database: process.env.DBNAME || 'LibMS',
            username: process.env.DBUSER || 'sa',
            password: process.env.DBPASSWORD || 'test123#',
            modelPaths: [modalDir]
        });

        this.dbConfig.authenticate().then((err) => {
            console.log('Connection successful', err);
        }).catch((err) => {
            console.log('Unable to connect to database', err);
        });
    }
}
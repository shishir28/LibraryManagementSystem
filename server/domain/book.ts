import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, AllowNull, ForeignKey, BelongsTo, Scopes } from 'sequelize-typescript';
import {Publisher} from "./Publisher";

  
@Table({ tableName: 'Book' })
export class Book extends Model<Book> {

    @PrimaryKey  
    @AutoIncrement  
    @AllowNull(false)    
    @Column({ type: DataType.INTEGER, field: 'BookId'})
    id: number

    @Column({ type: DataType.STRING(200) })
    Title: string

    @ForeignKey(() => Publisher)
    @Column({ type: DataType.INTEGER})    
    PublisherId: number

    @BelongsTo(() => Publisher)
    publisher: Publisher;
}



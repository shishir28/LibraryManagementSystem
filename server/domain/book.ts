import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, AllowNull } from 'sequelize-typescript';

@Table({ tableName: 'Book' })
export class book extends Model<book> {

    @PrimaryKey  
    @AutoIncrement  
    @AllowNull(false)    
    @Column({ type: DataType.INTEGER, field: 'BookId'})
    id: number

    @Column({ type: DataType.STRING(200) })
    Title: string

    @Column({ type: DataType.STRING(60) })
    PublisherName: string
}


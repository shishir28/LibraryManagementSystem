import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, AllowNull } from 'sequelize-typescript';

@Table({ tableName: 'Author' })
export class Author extends Model<Author> {

    @PrimaryKey  
    @AutoIncrement  
    @AllowNull(false)    
    @Column({ type: DataType.INTEGER, field: 'AuthorId'})
    id: number

    @Column({ type: DataType.STRING(50) })
    AuthorName: string
}
import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, AllowNull } from 'sequelize-typescript';

@Table({ tableName: 'BookAuthor' })
export class Author extends Model<Author> {

    @PrimaryKey  
    @AutoIncrement  
    @AllowNull(false)    
    @Column({ type: DataType.INTEGER, field: 'BookAuthorId'})
    id: number

    @Column({ type: DataType.INTEGER })
    BookId: number

    @Column({ type: DataType.STRING(50) })
    AuthorName: string
}


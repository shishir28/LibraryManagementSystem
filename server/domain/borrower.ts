import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, AllowNull } from 'sequelize-typescript';

@Table({ tableName: 'Borrower' })
export class Borrower extends Model<Borrower> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column({ type: DataType.INTEGER, field: 'BorrowerId' })
    id: number

    @Column({ type: DataType.STRING(50) })
    Name: string

    @Column({ type: DataType.STRING(250) })
    Address: string

    @Column({ type: DataType.STRING(20) })
    Phone: string
}
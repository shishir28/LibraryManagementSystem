import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, AllowNull } from 'sequelize-typescript';

@Table({ tableName: 'Publisher' })
export class Publisher extends Model<Publisher> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column({ type: DataType.INTEGER, field: 'PublisherId' })
    id: number

    @Column({ type: DataType.STRING(50) })
    Name: string

    @Column({ type: DataType.STRING(250) })
    Address: string

    @Column({ type: DataType.STRING(20) })
    Phone: string
}
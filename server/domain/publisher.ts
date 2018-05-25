import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, AllowNull } from 'sequelize-typescript';

@Table({ tableName: 'Publisher' })
export class publisher extends Model<publisher> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column({ type: DataType.INTEGER, field: 'PublisherId' })
    id: number

    @Column({ type: DataType.STRING(60) })
    Name: string


    @Column({ type: DataType.STRING(200) })
    Address: string

    @Column({ type: DataType.STRING(20) })
    Phone: string
}
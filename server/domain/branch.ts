import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, AllowNull } from 'sequelize-typescript';

@Table({ tableName: 'Branch' })
export class Branch extends Model<branch> {

    @PrimaryKey  
    @AutoIncrement  
    @AllowNull(false)    
    @Column({ type: DataType.INTEGER, field: 'BranchId'})
    id: number

    @Column({ type: DataType.STRING(50) })
    BranchName: string

    @Column({ type: DataType.STRING(200) })
    Address: string
}


import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";

@Entity()
export class Attendence {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("int")
    public studentId: number;    
    
    @Column("int")
    public subjectId: number;    

    @Column()
    @CreateDateColumn()
    createdAt: Date;

}

export default Attendence;
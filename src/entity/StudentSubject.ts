import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
export class StudentSubject {

    @PrimaryGeneratedColumn()
    id: number;
        
    @Column("int")
    @IsNotEmpty()
    public studentId: number;    
    
    @Column("int")
    @IsNotEmpty()
    public subjectId: number;    

    @Column()
    @CreateDateColumn()
    createdAt: Date;
}

export default StudentSubject;
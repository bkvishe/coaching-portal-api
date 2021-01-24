import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";

@Entity()
export class StudentSubject {

    @PrimaryGeneratedColumn()
    id: number;
        
    @Column("int")
    public studentId: number;    
    
    @Column("int")
    public subjectId: number;    

    @Column({ 
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: string;
}

export default StudentSubject;
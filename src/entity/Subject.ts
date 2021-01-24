import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
@Entity()
export class Subject {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;
    
    @Column("text")
    description: string;
    
    @Column("int")
    createdBy: number;
    
    @Column("int")
    updatedBy: number;
    
    @Column({ 
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: string;

    @Column({ 
        type: 'timestamp', 
        onUpdate: 'CURRENT_TIMESTAMP', 
        nullable: true 
    })
    updatedAt: string;
}

export default Subject;
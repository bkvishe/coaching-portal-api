import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique} from "typeorm";
import { IsNotEmpty, IsOptional } from 'class-validator';

@Entity()
@Unique(["name"])
export class Subject {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    @IsNotEmpty()
    name: string;
    
    @Column({
        type: 'text',
        nullable: true 
    })
    @IsOptional()
    description: string;
    
    @Column("int")
    createdBy: number;
    
    @Column({
        type: 'int',
        nullable: true 
    })
    updatedBy: number;
    
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Subject;
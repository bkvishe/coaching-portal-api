import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

export enum UserType {
    TEACHER = "teacher",
    STUDENT = "student"
}


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column({
        length: 32
    })
    userName: string;

    @Column({
        length: 256
    })
    password: string;

    @Column({
        type: "enum",
        enum: UserType,
        default: UserType.STUDENT
    })
    userType: UserType;

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

export default User;
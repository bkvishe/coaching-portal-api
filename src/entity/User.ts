import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Length, IsNotEmpty, IsEnum } from "class-validator";
import * as bcrypt from "bcryptjs";

export enum UserType {
    TEACHER = "teacher",
    STUDENT = "student"
}


@Entity()
@Unique(["username"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    fullName: string;

    @Column({
        length: 32
    })
    @IsNotEmpty()
    @Length(4, 20)
    username: string;

    @Column()
    @IsNotEmpty()
    @Length(4, 20)
    password: string;

    
    @Column({
        type: "enum",
        enum: UserType,
        default: UserType.STUDENT
    })
    @IsNotEmpty()
    @IsEnum(UserType)
    userType: UserType;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}

export default User;
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entity/User";

class UserController{

    static newUser = async (req: Request, res: Response) => {
        
        console.log(req.body);

        let { fullName, username, password, userType } = req.body;
        let user = new User();

        user.fullName = fullName;
        user.username = username;
        user.password = password;
        user.userType = userType;

        
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        
        user.hashPassword();

        
        const userRepository = getRepository(User);

        try {
            await userRepository.save(user);
        } catch (e) {
            console.log(e);
            res.status(409).send("Username already exists!");
            return;
        }

        res.status(201).send("User created!");
    };
};

export default UserController;
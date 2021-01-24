import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { User } from "../entity/User";

export const checkUserType = (roles: Array<string>) => {

  return async (req: Request, res: Response, next: NextFunction) => {
    
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;
    console.log(id);
    
    const userRepository = getRepository(User);
    let user: User;
    
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if array of authorized user types includes the user's type
    if (roles.indexOf(user.userType) > -1) 
      next();
    else 
      res.status(403).send();
  };
};
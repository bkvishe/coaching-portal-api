import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Subject } from "../entity/Subject";

class SubjectController{

    static listAll = async (req: Request, res: Response) => {
        
        let userId = res.locals.jwtPayload.userId;
        const subjectRepository = getRepository(Subject);

        const subjects = await subjectRepository.find({
            where: {
                createdBy: userId
            }
        });
        
        res.send(subjects);
    };

    static getOneById = async (req: Request, res: Response) => {
        
        const id: number = req.params.id;        
        const userId = res.locals.jwtPayload.userId;
        
        const subjectRepository = getRepository(Subject);

        try {
            
            const subject = await subjectRepository.findOneOrFail({
                where: {
                    id: id,
                    createdBy: userId
                }
            });

            res.send(subject);

        } catch (error) {
            res.status(404).send("Subject not found");
        }
        
    };

    static addSubject = async (req: Request, res: Response) => {

        console.log(req.body);

        let { name, description} = req.body;
        let subject = new Subject();

        subject.name = name;
        subject.description = description;
        subject.createdBy = res.locals.jwtPayload.userId;

        const errors = await validate(subject);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        const subjectRepository = getRepository(Subject);

        try {
            await subjectRepository.save(subject);
        } catch (e) {
            console.log(e);
            res.status(409).send("Subject name already exist!");
            return;
        }

        res.status(201).send("Subject Added!");
    };

    static updateSubject = async (req: Request, res: Response) => {
        
        const id = req.params.id;
        const userId = res.locals.jwtPayload.userId;
      
        
        const { name, description } = req.body;
      
        const subjectRepository = getRepository(Subject);

        let subject;

        try {
            
            subject = await subjectRepository.findOneOrFail({
                where: {
                    id: id,
                    createdBy: userId
                }
            });

        } catch (error) {
            
            res.status(404).send("Subject not found");

            return;
        }
      
        
        subject.name = name;
        subject.description = description;

        const errors = await validate(subject);

        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
      
        
        try {
          await subjectRepository.save(subject);
        } catch (e) {
          res.status(409).send("Subject name already exists!");
          return;
        }
        
        res.status(204).send();
    };

    static deleteSubject = async (req: Request, res: Response) => {
        
        const id = req.params.id;
        const userId = res.locals.jwtPayload.userId;
        
        const subjectRepository = getRepository(Subject);

        let subject: Subject;

        try {

            
            subject = await subjectRepository.findOneOrFail({
                where: {
                    id: id,
                    createdBy: userId
                }
            });

        } catch (error) {
            res.status(404).send("Subject not found");
            return;
        }

        subjectRepository.delete(id);
        
        res.status(204).send();        
    };
};

export default SubjectController;
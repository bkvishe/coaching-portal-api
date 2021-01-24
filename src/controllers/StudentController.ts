import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";
import { validate } from "class-validator";
import { StudentSubject } from "../entity/StudentSubject";
import { Subject​ } from "../entity/Subject";

class StudentController{

    static enrolForSubject = async (req: Request, res: Response) => {

        const userId = res.locals.jwtPayload.userId;
        let { subjectId } = req.body;

        let studentSubject = new StudentSubject();

        studentSubject.studentId = userId;
        studentSubject.subjectId = subjectId;

        const errors = await validate(studentSubject);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        // Check for valid subject
        try {
    
            const subjectRepository = getRepository(Subject​);
            const subject = await subjectRepository.findOneOrFail(subjectId);

        } catch (e) {

            res.status(404).send("Subject not found!");
            return;
        }

        const studentSubjectRepository = getRepository(StudentSubject);
            
        const currentMapping = await studentSubjectRepository.find({
            where: {
                studentId: userId,
                subjectId: subjectId
            }
        });

        if(currentMapping.length !== 0){

            res.status(409).send("Already enrolled for the Subject!");
            return;
        }

        try {

            await studentSubjectRepository.save(studentSubject);

        } catch (e) {
            
            res.status(409).send("Unbale to enrol for the subject! Please try again later.");
            return;
        }

        res.status(201).send("Successfully enrolled!");
    };

    static getAllAttendance = async (req: Request, res: Response) => {

        const userId = res.locals.jwtPayload.userId;

        const attendance = await StudentController.getAttendance(userId);

        console.log(attendance);

        res.send(attendance);

    };

    static getAttendanceBySubject = async (req: Request, res: Response) => {

        const userId: number = res.locals.jwtPayload.userId;
        const subjectId: number = req.params.id;

        // Check for valid subject
        try {

            const subjectRepository = getRepository(Subject​);
            const subject = await subjectRepository.findOneOrFail(subjectId);

        } catch (e) {

            res.status(404).send("Subject not found!");
            return;
        }

        const attendance = await StudentController.getAttendance(userId, subjectId);

        console.log(attendance);

        res.send(attendance);
    };
    
    // Common function to get attedance
    static getAttendance = async (userId: number, subjectId: number = null) => {
        
        let attendance = await getManager()
        .createQueryBuilder('attendance', 't1')
        .addSelect('t1.lectureId', 'lectureId')
        .addSelect('t1.createdAt', 'date')
        .addSelect('t2.name', 'subjectName')
        .innerJoin('subject', 't2', 't1.subjectId = t2.id')
        .where('t1.studentId = ' + userId);

        if(subjectId !== null)
        {
            attendance = attendance.andWhere('t1.subjectId = ' + subjectId);
        }
        
        return attendance.getRawMany();
    };
};

export default StudentController;
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Attendance​ } from "../entity/Attendance​";
import { User } from "../entity/User";
import { StudentSubject } from "../entity/StudentSubject";

class TeacherController{

    static updateAttendance = async (req: Request, res: Response) => {

        console.log(req.body);

        const subjectId: number = req.params.id;
        let { studentId, lectureId } = req.body;

        let attendance​ = new Attendance​();

        
        attendance​.subjectId = subjectId;
        attendance​.studentId = studentId;
        attendance​.lectureId = lectureId;

        const errors = await validate(attendance​);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        // Check for valid subject
        try {
            
            const studentSubjectRepository = getRepository(StudentSubject);
            const studentSubject = await studentSubjectRepository.findOneOrFail({
                where: {
                    studentId: studentId,
                    subjectId: subjectId
                }
            });

        } catch (e) {

            res.status(404).send("Student hasn't enrolled for the Subject!");
            return;
        }

        // Check for valid student
        try {
            
            const userRepository = getRepository(User);
            const user = await userRepository.findOneOrFail({
                where: {
                    id: studentId,
                    userType: 'student'
                }
            });

        } catch (e) {
            
            res.status(404).send("Student not found!");
            return;
        }

        const attendanceRepository = getRepository(Attendance​);
            
        const currentMapping = await attendanceRepository.find({
            where: {
                subjectId: subjectId,
                studentId: studentId,
                lectureId: lectureId

            }
        });

        if(currentMapping.length !== 0){

            res.status(409).send("Attendence has already been marked!");
            return;
        }

        try {

            await attendanceRepository.save(attendance​);

        } catch (e) {
            
            res.status(409).send("Unbale to mark attendance of the Student! Please try again later.");
            return;
        }

        res.status(201).send("Successfully marked attendance!");
    };

    
};

export default TeacherController;
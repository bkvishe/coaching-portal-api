import { Router } from "express";
import StudentController from "../controllers/StudentController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkUserType } from "../middlewares/checkUserType";

const router = Router();

// Enrol for the Subject
router.post("/enrol", [checkJwt, checkUserType(["student"])], StudentController.enrolForSubject);

// Get all attendance
router.get("/attendance", [checkJwt, checkUserType(["student"])], StudentController.getAllAttendance);

// Get attendance against a Subject
router.get("/attendance/:id([0-9]+)", [checkJwt, checkUserType(["student"])], StudentController.getAttendanceBySubject);

export default router;
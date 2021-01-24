import { Router } from "express";
import TeacherController from "../controllers/TeacherController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkUserType } from "../middlewares/checkUserType";

const router = Router();

// Mark attendance of the Student
router.post("/attendance/:id([0-9]+)", [checkJwt, checkUserType(["teacher"])], TeacherController.updateAttendance);

export default router;
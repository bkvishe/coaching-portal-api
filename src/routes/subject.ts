import { Router } from "express";
import SubjectController from "../controllers/SubjectController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkUserType } from "../middlewares/checkUserType";

const router = Router();

//Add new Subject
router.post("/", [checkJwt, checkUserType(["teacher"])], SubjectController.addSubject);

//List Subject
router.get("/", [checkJwt, checkUserType(["teacher"])], SubjectController.listAll);

//Get one by Id
router.get("/:id([0-9]+)", [checkJwt, checkUserType(["teacher"])], SubjectController.getOneById);

//Edit one Subject
router.patch("/:id([0-9]+)", [checkJwt, checkUserType(["teacher"])], SubjectController.updateSubject);

//Delete Subject
router.delete("/:id([0-9]+)", [checkJwt, checkUserType(["teacher"])], SubjectController.deleteSubject);

export default router;
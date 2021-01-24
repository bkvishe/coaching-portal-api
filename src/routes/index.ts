import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import subject from "./subject";
import student from "./student";
import teacher from "./teacher";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/subject", subject);
routes.use("/student", student);
routes.use("/teacher", teacher);

export default routes;
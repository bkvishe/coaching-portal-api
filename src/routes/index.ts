import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import subject from "./subject";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/subject", subject);

export default routes;
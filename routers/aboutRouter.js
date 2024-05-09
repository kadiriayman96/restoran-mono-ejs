import { aboutController } from "../controllers/aboutController.js";
import express from "express";

const aboutRouter = express.Router();

aboutRouter.get("/", aboutController);

export { aboutRouter };

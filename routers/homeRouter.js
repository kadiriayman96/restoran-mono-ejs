import { homeController } from "../controllers/homeController.js";
import { sendEmail } from "../middlewares/mailer.js";
import express from "express";

const homeRouter = express.Router();

homeRouter.get("/", homeController);
homeRouter.post("/", sendEmail);

export { homeRouter };

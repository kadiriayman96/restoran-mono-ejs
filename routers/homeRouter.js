import { homeController, bookNow } from "../controllers/homeController.js";
import { sendEmail } from "../middlewares/mailer.js";
import { validationReservation } from "../middlewares/validationResa.js";
import express from "express";

const homeRouter = express.Router();

homeRouter.get("/", homeController);

homeRouter.post("/sendEmail", sendEmail);

homeRouter.post("/bookNow", validationReservation, bookNow);

export { homeRouter };

import { contactController } from "../controllers/contactController.js";
import express from "express";

const contactRouter = express.Router();

contactRouter.get("/", contactController);

export { contactRouter };

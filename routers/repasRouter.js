import { ajouterRepas, getCategories } from "../controllers/repasController.js";
import validationRepas from "../middlewares/validationRepas.js";
import upload from "../middlewares/imageUpload.js";
import express from "express";

const repasRouter = express.Router();

repasRouter.get("/", getCategories);

repasRouter.post(
  "/",
  upload.single("url_image"),
  validationRepas,
  ajouterRepas
);

export { repasRouter };

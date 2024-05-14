import {
  ajouterRepas,
  upload,
  getCategories,
} from "../controllers/repasController.js";
import validationRepas from "../middlewares/validationRepas.js";
import express from "express";

const repasRouter = express.Router();

repasRouter.get("/", getCategories);

repasRouter.post("/", upload, validationRepas, ajouterRepas);

export { repasRouter };

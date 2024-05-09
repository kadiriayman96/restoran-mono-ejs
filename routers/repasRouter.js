import {
  ajouterRepas,
  upload,
  getCategories,
} from "../controllers/repasController.js";
import express from "express";

const repasRouter = express.Router();

repasRouter.get("/", getCategories);

repasRouter.post("/", upload, ajouterRepas);

export { repasRouter };

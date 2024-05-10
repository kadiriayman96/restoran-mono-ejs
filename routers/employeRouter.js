import {
  ajouterEmployee,
  upload,
  getRestaurants,
} from "../controllers/employeController.js";
import express from "express";

const employeeRouter = express.Router();

employeeRouter.get("/", getRestaurants);

employeeRouter.post("/", upload, ajouterEmployee);

export { employeeRouter };

import {
  ajouterEmployee,
  upload,
  getRestaurants,
} from "../controllers/employeController.js";
import validationEmployee from "../middlewares/validationEmployee.js";
import express from "express";

const employeeRouter = express.Router();

employeeRouter.get("/", getRestaurants);

employeeRouter.post("/", upload, validationEmployee, ajouterEmployee);

export { employeeRouter };

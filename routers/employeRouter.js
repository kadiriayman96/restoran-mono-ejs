import validationEmployee from "../middlewares/validationEmployee.js";
import upload from "../middlewares/imageUpload.js";
import express from "express";
import {
  ajouterEmployee,
  getRestaurants,
} from "../controllers/employeController.js";

const employeeRouter = express.Router();

employeeRouter.get("/", getRestaurants);

employeeRouter.post(
  "/",
  upload.single("url_image"),
  validationEmployee,
  ajouterEmployee
);

export { employeeRouter };

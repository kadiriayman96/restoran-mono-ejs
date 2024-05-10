import express from "express";
import { PrismaClient } from "@prisma/client";
import { homeRouter } from "./routers/homeRouter.js";
import { contactRouter } from "./routers/contactRouter.js";
import { aboutRouter } from "./routers/aboutRouter.js";
import { repasRouter } from "./routers/repasRouter.js";
import { employeeRouter } from "./routers/employeRouter.js";
import { logData } from "./middlewares/logs.js";

const prisma = new PrismaClient();

const app = express();
const PORT = 1600;

app.set("view engine", "ejs");
app.set("views", "views");

// Use express.json middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(logData);

app.use("/home", homeRouter);
app.use("/contact", contactRouter);
app.use("/about", aboutRouter);
app.use("/ajouterRepas", repasRouter);
app.use("/ajouterEmployee", employeeRouter);

// Middleware pour gérer les URL mal écrites (404)
app.use((req, res, next) => {
  res.render("404");
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
  console.log(error.stack);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

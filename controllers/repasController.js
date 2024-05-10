import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import path from "path";

const prisma = new PrismaClient();

// get list of categories of categories
const getCategories = async (req, res) => {
  try {
    const categories = await prisma.categorie.findMany();
    const restaurantData = await prisma.restaurants.findFirst();
    return res.render("ajouterRepas", { categories, restaurantData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// Add a new repas
const ajouterRepas = async (req, res, next) => {
  try {
    const { nom, description, prix, id_categorie } = req.body;
    const url_image = req.file ? `/img/${req.file.filename}` : null;

    console.log(req.body);

    const newRepas = await prisma.repas.create({
      data: {
        id_repas: uuidv4(),
        nom,
        description,
        prix,
        url_image,
        id_categorie,
      },
      include: {
        categorie: true,
      },
    });
    return res.redirect("/home");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Stockage images destination for repas
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer for repas
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(undefined, true);
  },
}).single("url_image");

export { ajouterRepas, upload, getCategories };

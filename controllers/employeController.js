import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import path from "path";

const prisma = new PrismaClient();

//list of restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurantsList = await prisma.restaurants.findMany();
    const restaurantData = await prisma.restaurants.findFirst();

    const emailSent = req.query.emailSent === "true";
    const emailSentQueryParam = req.query.emailSent;

    res.render("ajouterEmployee", {
      restaurantsList,
      restaurantData,
      emailSent,
      emailSentQueryParam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// Add a new employe
const ajouterEmployee = async (req, res, next) => {
  try {
    const {
      nom,
      designation,
      facebook_url,
      instagram_url,
      twitter_url,
      id_restaurant,
    } = req.body;
    const url_image = req.file ? `/img/${req.file.filename}` : null;

    const newEmploye = await prisma.employes.create({
      data: {
        id_employe: uuidv4(),
        nom,
        designation,
        url_image,
        facebook_url,
        instagram_url,
        twitter_url,
        id_restaurant,
      },
      include: {
        restaurants: true,
      },
    });
    return res.redirect("/home");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Stockage images destination for employe
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer for employe
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

export { ajouterEmployee, upload, getRestaurants };

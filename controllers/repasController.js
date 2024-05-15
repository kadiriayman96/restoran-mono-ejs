import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

// get list of categories of categories
const getCategories = async (req, res) => {
  try {
    const categories = await prisma.categorie.findMany();
    const restaurantData = await prisma.restaurants.findFirst();

    const emailSent = req.query.emailSent === "true";
    const emailSentQueryParam = req.query.emailSent;

    res.render("ajouterRepas", {
      categories,
      restaurantData,
      emailSent,
      emailSentQueryParam,
    });
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

export { ajouterRepas, getCategories };

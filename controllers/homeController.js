import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const homeController = async (req, res) => {
  try {
    await renderHome(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const renderHome = async (req, res) => {
  const repasList = await prisma.repas.findMany({
    include: {
      categorie: true,
    },
  });

  const employeeList = await prisma.employes.findMany();
  const restaurantData = await prisma.restaurants.findFirst();

  res.render("home", {
    repasList,
    employeeList,
    restaurantData,
  });
};

export { homeController };

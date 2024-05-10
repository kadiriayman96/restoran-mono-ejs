import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const contactController = async (req, res) => {
  try {
    const restaurantData = await prisma.restaurants.findFirst();
    res.render("contact", {
      restaurantData,
    });
  } catch (error) {
    console.log(error);
  }
};

export { contactController };

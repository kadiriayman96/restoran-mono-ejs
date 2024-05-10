import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const aboutController = async (req, res) => {
  try {
    const employeeList = await prisma.employes.findMany();
    const restaurantData = await prisma.restaurants.findFirst();
    res.render("about", {
      employeeList,
      restaurantData,
    });
  } catch (error) {
    console.log(error);
  }
};

export { aboutController };

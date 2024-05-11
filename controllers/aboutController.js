import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const aboutController = async (req, res) => {
  try {
    const employeeList = await prisma.employes.findMany();
    const restaurantData = await prisma.restaurants.findFirst();

    const emailSent = req.query.emailSent === "true";
    const emailSentQueryParam = req.query.emailSent;

    res.render("about", {
      employeeList,
      restaurantData,
      emailSent,
      emailSentQueryParam,
    });
  } catch (error) {
    console.log(error);
  }
};

export { aboutController };

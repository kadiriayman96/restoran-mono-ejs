import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const contactController = async (req, res) => {
  try {
    const restaurantData = await prisma.restaurants.findFirst();

    const emailSent = req.query.emailSent === "true";
    const emailSentQueryParam = req.query.emailSent;

    res.render("contact", {
      restaurantData,
      emailSent,
      emailSentQueryParam,
    });
  } catch (error) {
    console.log(error);
  }
};

export { contactController };

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
  try {
    const repasList = await prisma.repas.findMany({
      include: {
        categorie: true,
      },
    });

    const employeeList = await prisma.employes.findMany();
    const restaurantData = await prisma.restaurants.findFirst();

    // Check if the query parameter indicates email was sent successfully
    const emailSent = req.query.emailSent === "true";
    const emailSentQueryParam = req.query.emailSent;

    // Render the EJS template with the appropriate email sent flag
    res.render("home", {
      repasList,
      employeeList,
      restaurantData,
      emailSent,
      emailSentQueryParam, // Pass the query parameter value to the template
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export { homeController };

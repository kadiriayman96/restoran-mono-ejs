import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

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

const bookNow = async (req, res) => {
  try {
    const {
      nom_client,
      email_client,
      date_reservation,
      nombre_clients,
      demandes_speciales,
    } = req.body;

    //convert date to date
    const dateObject = moment(date_reservation, "MM/DD/YYYY hh:mm A").toDate();
    console.log(dateObject);

    const reservation = await prisma.reservation.create({
      data: {
        reservation_id: uuidv4(),
        nom_client,
        email_client,
        date_reservation: dateObject,
        nombre_clients: parseInt(nombre_clients),
        demandes_speciales,
      },
    });
    return res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export { homeController, bookNow };

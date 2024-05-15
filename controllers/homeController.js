import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const prisma = new PrismaClient();
dotenv.config();

const user_email = process.env.EMAIL_USERNAME;
const user_password = process.env.EMAIL_PASSWORD;

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

    const isoDate = moment(date_reservation, "MM/DD/YYYY h:mm A").toISOString();
    const reservation = await prisma.reservation.create({
      data: {
        reservation_id: uuidv4(),
        nom_client,
        email_client,
        date_reservation: isoDate,
        nombre_clients: parseInt(nombre_clients),
        demandes_speciales: demandes_speciales || "",
      },
    });

    // send mail to client
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true, // Use true for port 465, false for all other ports
      auth: {
        user: user_email,
        pass: user_password,
      },
    });

    const mailOptions = {
      from: user_email,
      to: email_client,
      subject: "Reservation from Restoran App - Thank you!",
      text: "You have successfully reserved a table at Restoran App",
      html: `<p>Dear ${nom_client}, this is a confirmation of your reservation.</p>
             <p>Summary of your reservation:</p>
             <p>Date: ${moment(date_reservation).format("MMMM Do YYYY")}</p>
             <p>Number of guests: ${nombre_clients}</p>
             <p>Special requests: ${demandes_speciales}</p>
             <p>Our Reservation team will contact you SOOOON !</p>
             <p>Thank you for booking!</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Reservation successfully sent to " + email_client);
      }
    });

    return res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export { homeController, bookNow };

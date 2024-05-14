import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

// Validation schema
const employeeSchema = Joi.object({
  nom: Joi.string().min(3).max(50).required(),
  designation: Joi.string().min(4).max(255).required(),
  facebook_url: Joi.string().uri(),
  instagram_url: Joi.string().uri(),
  twitter_url: Joi.string().uri(),
  id_restaurant: Joi.string()
    .required()
    .custom(async (value, helpers) => {
      const restaurant = await prisma.restaurants.findUnique({
        where: {
          id_restaurant: value,
        },
      });
      if (!restaurant) {
        return helpers.message("Le restaurant n'existe pas");
      }
    }),
});

const validationEmployee = async (req, res, next) => {
  try {
    const { error } = await employeeSchema.validateAsync(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export default validationEmployee;

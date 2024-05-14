import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

// Validation schema
const repasSchema = Joi.object({
  nom: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(3).max(255).required(),
  prix: Joi.number().positive().required(),
  id_categorie: Joi.string()
    .required()
    .custom(async (value, helpers) => {
      const category = await prisma.categorie.findUnique({
        where: {
          id_categorie: value,
        },
      });
      if (!category) {
        return helpers.message("La categorie n'existe pas");
      }
    }),
});

const validationRepas = async (req, res, next) => {
  try {
    const { error } = await repasSchema.validateAsync(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export default validationRepas;

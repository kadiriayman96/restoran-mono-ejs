import Joi from "joi";

const reservationSchema = Joi.object({
  nom_client: Joi.string().min(3).max(100).required(),
  email_client: Joi.string().email().required(),
  date_reservation: Joi.string().required(),
  nombre_clients: Joi.string().required(),
  demandes_speciales: Joi.string().allow("", null),
});

const validationReservation = async (req, res, next) => {
  try {
    const { error } = await reservationSchema.validateAsync(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export { validationReservation };

const contactController = async (req, res) => {
  try {
    return res.render("contact");
  } catch (error) {
    console.log(error);
  }
};

export { contactController };

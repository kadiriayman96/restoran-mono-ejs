import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const aboutController = async (req, res) => {
  try {
    const employeeList = await prisma.employes.findMany();
    res.render("about", {
      employeeList,
    });
  } catch (error) {
    console.log(error);
  }
};

export { aboutController };

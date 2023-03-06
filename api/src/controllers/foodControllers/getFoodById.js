const { Food } = require("../../db");
const foods = require("../../fileTemp");

module.exports = getFoodById = async (req, res) => {
  const { id } = req.params;
  try {
    const useSql = await Food.findAll({ where: { id: id } });
    const useArray = foods.filter((e) => e.id === id);
    if (useSql.length > 0) {
      res.status(200).send(useSql);
    } else if (useArray.length > 0) {
      res.status(200).send(useArray);
    } else {
      res.status(200).send({ message: "It was not found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const categoryModel = require("./CategoryModel");

class CategoryController {
  async getCategory(req, res) {
    try {
      const result =await categoryModel.find();
      if (result) {
        return res.status(200).send({ message: "succes", result });
      }
      return res.status(500).send({ message: "something went wrong" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
  async createCategory(req, res) {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).send({ message: "name is required" });
      const result =await categoryModel.create(req.body);
      if (result) {
        return res.status(200).send({ message: "succes" });
      }
      return res.status(500).send({ message: "something went wrong" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  
}

const categoryController = new CategoryController();
module.exports = categoryController;

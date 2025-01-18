const blogModel = require("./BlogModel");

class BlogController {
  async getBlog(req, res) {
    try {
      const result = await blogModel.find().populate({ path: "category" });
      if (result) {
        return res.status(200).send({ message: "succes", result });
      }
      return res.status(500).send({ message: "something went wrong" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
  async createBlog(req, res) {
    try {
      const { title, description, category } = req.body;
      if (!title) return res.status(400).send({ message: "title is required" });
      if (!description)
        return res.status(400).send({ message: "description is required" });
      if (!category)
        return res.status(400).send({ message: "category is required" });

      const result = await blogModel.create(req.body);
      if (result) {
        return res.status(200).send({ message: "succes" });
      }
      return res.status(500).send({ message: "something went wrong" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
  async updateBlog(req, res) {
    try {
      const { _id } = req.body;
      delete req.body._id;
      if (!_id) return res.status(400).send({ message: "id is required" });

      const result = await blogModel.findByIdAndUpdate(_id, { ...req.body });
      if (result) {
        return res.status(200).send({ message: "succes" });
      }
      return res.status(500).send({ message: "something went wrong" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
  async deleteBlog(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).send({ message: "id is required" });

      const result = await blogModel.findByIdAndDelete(id);
      if (result) {
        return res.status(200).send({ message: "succes" });
      }
      return res.status(500).send({ message: "something went wrong" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
  async getOneBlog(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).send({ message: "id is required" });

      const result = await blogModel
        .findOne({ _id: id })
        .populate({ path: "category" });
      if (result) {
        return res.status(200).send({ message: "succes",result });
      }
      return res.status(500).send({ message: "something went wrong" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
}

const blogController = new BlogController();
module.exports = blogController;

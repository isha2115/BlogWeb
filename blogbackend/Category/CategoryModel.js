const { default: mongoose, Schema } = require("mongoose");

class CategoryModel {
  constructor() {
    this.schema = new mongoose.Schema({
      name: { type: String, required: true },
    });
  }
}
const category = new CategoryModel();
const categoryModel = mongoose.model("tbl_category", category.schema);
module.exports = categoryModel;

const { default: mongoose, Schema } = require("mongoose");

class BlogModel {
  constructor() {
    this.schema = new mongoose.Schema({
      title: { type: String, required: true },
      description: { type: String, require: true },
      category: {
        type: Schema.Types.ObjectId,
        ref: "tbl_category",
        required: true,
      },
    });
  }
}
const blog = new BlogModel();
const blogModel = mongoose.model("tbl_blog", blog.schema);
module.exports = blogModel;

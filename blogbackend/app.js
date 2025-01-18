const express = require("express");
const cors = require("cors");
const connectDb = require("./connection");
const userController = require("./User/UserController");
const blogController = require("./Blog/BlogController");
const Authentication = require("./Auth/Auth");
const categoryController = require("./Category/CategoryContoller");
const app = express();
app.use(express.json())
app.use(cors());
connectDb();
require("dotenv").config()
//user
app.get("/user", userController.getUser);
app.post("/user", userController.createUser);
app.post("/login", userController.loginUser);


//blog
app.get("/Blog",Authentication, blogController.getBlog);
app.post("/Blog", Authentication, blogController.createBlog);
app.put("/Blog", Authentication, blogController.updateBlog);
app.delete("/Blog/:id", Authentication, blogController.deleteBlog);
app.get("/Blog/:id", Authentication, blogController.getOneBlog);

//category
app.get("/category",Authentication, categoryController.getCategory);
app.post("/category", Authentication, categoryController.createCategory);


app.listen(5000, () => {
  console.log("Server Started");
});

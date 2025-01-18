const userModel = require("./UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  async getUser(req, res) {
    try {
      const result = await userModel.find();
      if (result) {
        return res.status(200).send({ message: "succes", result });
      }
      return res.status(500).send({ message: "something went wrong" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
  async createUser(req, res) {
    try {

      const { name, email, password } = req.body;
      if (!name) return res.status(400).send({ message: "name is required" });
      if (!email) return res.status(400).send({ message: "email is required" });
      const pass = bcrypt.hashSync(password, 8);
      if (!pass)
        return res.status(400).send({ message: "password is required" });
      delete req.body.password;
      const token = jwt.sign(req.body, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      const result =await userModel.create({ ...req.body, password: pass });
      if (result) {
        return res.status(200).send({ message: "succes", token });
      }
      return res.status(500).send({ message: "something went wrong" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) return res.status(400).send({ message: "email is required" });

      let user = await userModel.findOne({ email: email });
      if (!user) {
        return res.send(400).send({ message: "User Not Found" });
      }
      user = user._doc;

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).send({ message: "Password Does not Match" });
      }

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      delete user.password;
      if (!token)
        return res.status(400).send({ message: "something went wrong" });

      return res
        .status(200)
        .send({ message: "succes", user: { ...user, token: token } });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
}

const userController = new UserController();
module.exports = userController;

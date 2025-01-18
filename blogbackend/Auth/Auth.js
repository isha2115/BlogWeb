const jwt = require("jsonwebtoken");

const Authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(400).send({ message: "Unauthorized" });

    return jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (data) {
        req.body.userInfo = data;
        return next();
      }
      if(err){
        console.log(err);
        return res.status(400).send({message:"internal server error"})
      }
    });
  } catch (error) {

    console.log(err);
    return res.status(400).send({ message: "internal server error" });
  }
};

module.exports = Authentication
const { token } = require("../controllers/user.controller");

const validateAuth = async (req, res, next) => {
  const authHeader = req["authorization"];
  if (!authHeader) {
    return res.status(401).send({ msg: "Authorization header missing!" });
  }
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ msg: "Invalid token format!" });
  }
  if (token !== authHeader.split(" ")[1]) {
    return res.status(401).send({ msg: "Invalid authorization token!" });
  }
  next();
};

module.exports = validateAuth;

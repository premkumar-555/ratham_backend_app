const simpleStore = require("../store/simpleStore");
const validateAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const storedToken = simpleStore.getToken();
  if (!authHeader) {
    return res.status(401).send({ msg: "Authorization header missing!" });
  }
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ msg: "Invalid token format!" });
  }
  if (storedToken !== authHeader.split(" ")[1]) {
    return res.status(401).send({ msg: "Invalid authorization token!" });
  }
  next();
};

module.exports = validateAuth;

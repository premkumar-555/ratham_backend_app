const express = require("express");
const router = express.Router();
const userModel = require("../Models/user.model");
const validateSession = require("../middlewares/validateSession");
const uuid = require('uuid')
let bearerToken = {token: ''}; // object to store bearer token for authorization purposes

router.post("/user_signup", validateSession(`Credentials are missing :`), sync (req, res) => {
  try {
    const { user_name, university_id, password } = req.body;
    const user = await userModel.create(req.body);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/user_login", validateSession(`Credentials are missing :`), async (req, res) => {
  try {
    const { university_id, password } = req.body;
    const user = await userModel
      .find({ university_id: university_id, password: password })
      .select("-password");
    if (!user) {
      return res.status(400).send(`User does not exist!`);
    }
    bearerToken.token = uuid();
    return res.status(200).send({...user, bearerToken: bearerToken?.token});
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;

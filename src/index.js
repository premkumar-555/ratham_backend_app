const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const connect = require("./dbConfig/dbconfig");
app.use(cors());
app.use(express.json());

// controllers
const sessionsController = require("./controllers/session.controller");
const usersController = require("./controllers/user.controller");

// listen to respective controllers
app.use("/sessions", sessionsController);
app.use("/users", usersController);
app.listen(PORT, async (req, res) => {
  try {
    await connect();
    console.log("successfully listening", PORT);
  } catch (error) {
    console.log(error.message);
  }
});

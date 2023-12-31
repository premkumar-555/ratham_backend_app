const express = require("express");
const router = express.Router();
const sessionModel = require("../Models/session.model");
const validateSession = require("../middlewares/validateSession");
const validateAuth = require("../middlewares/validateAuth");
const moment = require("moment");
// post sessions
router.post("/post_sessions", validateAuth, async (req, res) => {
  try {
    const sessions = await sessionModel.create(req.body);
    return res.status(200).send("Sessions Posted Successfully!");
  } catch (error) {
    return res.status(500).send(error);
  }
});

// get sessions
router.get("/get_sessions", validateAuth, async (req, res) => {
  try {
    const { dean_id } = req.query;
    let conditions;
    if (dean_id) {
      conditions = {
        $and: [
          {
            $expr: {
              $gt: [
                {
                  $add: ["$date", { $multiply: ["$duration", 60 * 60 * 1000] }],
                },
                new Date(),
              ],
            },
          },
          { dean: dean_id },
          { isBooked: true },
        ],
      };
    } else {
      conditions = {
        $and: [
          {
            $expr: {
              $gt: [
                {
                  $add: ["$date", { $multiply: ["$duration", 60 * 60 * 1000] }],
                },
                new Date(),
              ],
            },
          },
          { isBooked: false },
        ],
      };
    }
    const sessions = await sessionModel
      .find(conditions)
      .populate({ path: "dean", select: "-password" })
      .populate({ path: "student_allotted", select: "-password" })
      .exec();
    return res.status(200).send(sessions);
  } catch (error) {
    return res.status(500).send(error);
  }
});

const validations = [
  validateAuth,
  validateSession(`Credentials are missing / Wrong credentials are provided!`),
];
// book a slot
router.post("/book_session/:id", validations, async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send(`Please provide session_id!`);
    }
    const targetSession = await sessionModel.findById(id);
    if (!targetSession) {
      return res.status(400).send(`Session does not exist`);
    }
    const session = await sessionModel.findByIdAndUpdate({ _id: id }, req.body);
    return res.status(200).send("Session Booked Successfully!");
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;

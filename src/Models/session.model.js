const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    duration: { type: Number, default: 1 },
    dean: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isBooked: { type: Boolean, default: false },
    student_allotted: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: false,
  }
);

const sessionModel = mongoose.model("Session", sessionSchema);

module.exports = sessionModel;

const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },
    examination: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    subjects: {
      type: Array,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("results", resultSchema);

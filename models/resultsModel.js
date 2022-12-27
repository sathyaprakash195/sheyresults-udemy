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
    /*subjects1: {
      type: Array,
      required: true,
    }, */
    semester: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("results", resultSchema);

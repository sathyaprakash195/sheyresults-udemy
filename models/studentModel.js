const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  rollNo: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  class: {
    type: Number,
    required: true,
  },
  results: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("students", studentSchema);

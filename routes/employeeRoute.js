const express = require("express");
const router = express.Router();
const Employee = require("../models/employeeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// register new employee

router.post("/register", async (req, res) => {
  try {
    const employeeExists = await Employee.findOne({
      employeeId: req.body.employeeId,
    });
    if (employeeExists) {
      return res.status(200).send({
        message: "Employee already exists",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(200).send({
      message: "Registration successful , Please wait for admin approval",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      succes: false,
    });
  }
});

// login employee
router.post("/login", async (req, res) => {
  try {
    const employee = await Employee.findOne({
      employeeId: req.body.employeeId,
    });
    if (!employee) {
      return res.status(200).send({
        message: "Employee not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, employee.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid password",
        success: false,
      });
    }
    if (employee.isApproved === false) {
      return res.status(200).send({
        message: "Your account is not approved yet",
        success: false,
      });
    }

    const token = jwt.sign(
      { employeeId: employee._id },
      process.env.jwt_secret,
      { expiresIn: "24h" }
    );
    res.status(200).send({
      message: "Login successful",
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// get employee by id

router.post("/get-employee-by-id", authMiddleware, async (req, res) => {
  try {
    console.log(req.body);
    const employee = await Employee.findOne({
      _id: req.body.employeeId,
    });
    if (!employee) {
      return res.status(200).send({
        message: "Employee not found",
        success: false,
      });
    }
    employee.password = undefined;
    res.status(200).send({
      message: "Employee found",
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
}),


  (module.exports = router);

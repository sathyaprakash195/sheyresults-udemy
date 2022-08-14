const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const Result = require("../models/resultsModel");
const Student = require("../models/studentModel");

//  add new result
router.post("/add-result", authMiddleware, async (req, res) => {
  try {
    const resultExists = await Result.findOne({
      examination: req.body.examination,
    });
    if (resultExists) {
      return res.status(200).send({
        message: "Result already exists",
        success: false,
      });
    }
    const newResult = new Result(req.body);
    await newResult.save();
    res.status(200).send({
      message: "Result added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// get all results
router.post("/get-all-results", async (req, res) => {
  try {
    const results = await Result.find();
    res.status(200).send({
      message: "Results retrieved successfully",
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// get result by id
router.post("/get-result/:resultId", async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId);
    res.status(200).send({
      message: "Result retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// add student result
router.post("/save-student-result", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.body.studentId);
    if (!student) {
      return res.status(200).send({
        message: "Student not found",
        success: false,
      });
    }
    let newResults = student.results;
    const existingResults = student.results;
    const resultExists = existingResults.find(
      (result) => result.resultId === req.body.resultId
    );

    if (resultExists) {
      newResults = existingResults.map((result) => {
        if (result.resultId === req.body.resultId) {
          return {
            ...result,
            obtainedMarks: req.body.obtainedMarks,
            verdict: req.body.verdict,
          };
        }
        return result;
      });
    } else {
      newResults = [...existingResults, req.body];
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.body.studentId,
      {
        results: newResults,
      },
      { new: true }
    );
    res.status(200).send({
      message: "Result saved successfully",
      success: true,
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// get student result by id

router.post("/get-student-result", async (req, res) => {
  try {
    const student = await Student.findOne({
      rollNo: req.body.rollNo,
    });
    if (!student) {
      return res.status(200).send({
        message: "Student not found",
        success: false,
      });
    }
    const resultExists = student.results.find(
      (result) => result.resultId === req.body.resultId
    );
    if (!resultExists) {
      return res.status(200).send({
        message: "Result not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Result retrieved successfully",
      success: true,
      data: {
        ...resultExists,
        studentId: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;

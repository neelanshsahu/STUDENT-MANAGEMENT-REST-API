const express = require("express");

const router = express.Router();

const students = require("../data/students");

// ==========================================
// GET ALL STUDENTS
// GET /students
// ==========================================

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
});


// ==========================================
// GET STUDENT BY ID
// GET /students/:id
// ==========================================

router.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json({
        success: true,
        data: student
    });
});


// ==========================================
// CREATE NEW STUDENT
// POST /students
// ==========================================

router.post("/", (req, res) => {

    const { name, age, course, email } = req.body;

    // Validation
    if (!name || !age || !course || !email) {
        return res.status(400).json({
            success: false,
            message: "Name, age, course and email are required"
        });
    }

    const newStudent = {
        id: students.length > 0
            ? students[students.length - 1].id + 1
            : 1,
        name,
        age,
        course,
        email
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: newStudent
    });
});


// ==========================================
// UPDATE STUDENT
// PUT /students/:id
// ==========================================

router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const { name, age, course, email } = req.body;

    if (!name || !age || !course || !email) {
        return res.status(400).json({
            success: false,
            message: "Name, age, course and email are required"
        });
    }

    students[studentIndex] = {
        id,
        name,
        age,
        course,
        email
    };

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: students[studentIndex]
    });
});


// ==========================================
// DELETE STUDENT
// DELETE /students/:id
// ==========================================

router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        data: deletedStudent[0]
    });
});

module.exports = router;
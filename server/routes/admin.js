const express = require('express');
const jwt = require('jsonwebtoken');
const { Admin, Course } = require('../db/db');
const { adminSecKey, adminAuthenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.get("/me", adminAuthenticateJwt, async (req, res) => {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
        res.status(403).json("Admin does not exist");
        return
    } else {
        res.json({
            username: admin.username
        })
    }
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (username && password) {
            const existingAdmin = await Admin.findOne({ username });
            if (existingAdmin) {
                return res.status(403).json('Admin already exists')
            }
            const newAdmin = new Admin({ username, password });
            await newAdmin.save();

            const token = jwt.sign({ username, role: 'admin' }, adminSecKey, { expiresIn: '1h' });
            res.json({ message: "Admin created successfully", token });
        } else {
            res.status(400).json('Username and password are required')
        }
    }
    catch (error) {
        // Handle errors by logging them and sending an error response
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (username && password) {
            const admin = await Admin.findOne({ username, password });
            if (admin) {
                const token = jwt.sign({ username, role: 'admin' }, adminSecKey, { expiresIn: '1h' })
                res.json({ message: "Logged in successfully", token })
            }
            else {
                res.status(403).json({ message: "Invalid username or password" });
            }
        } else {
            res.status(400).json('Username and password are required')
        }
    }
    catch (error) {
        // Handle errors by logging them and sending an error response
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// to add course
router.post('/addcourse', adminAuthenticateJwt, async (req, res) => {
    try {
        const { title, description, price, imageLink } = req.body;

        if (!title || !description || !price || !imageLink === undefined) {
            alert({ message: 'All fields are required for course creation' });
        }

        const course = new Course(req.body);
        await course.save();
        res.status(201).json({ message: 'Course created successfully', courseId: course._id });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


//to update a course
router.put('/courses/:courseId', adminAuthenticateJwt, async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
        if (course) {
            res.json({ message: 'Course updated successfully' })
        } else {
            res.status(404).json({ message: 'Course not found' })
        }
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//to get one course from the list of course
router.get('/courses/:courseId', adminAuthenticateJwt, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        if (course) {
            res.json({ course })
        }
        else {
            res.status(404).json({ message: 'Course not found' })
        }
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//to show the course
router.get('/courses', adminAuthenticateJwt, async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json({ courses })
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//to delete the course
router.delete('/courses/:courseId', adminAuthenticateJwt, async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const deleteCourse = await Course.findByIdAndDelete(courseId);

        if (deleteCourse) {
            res.status(200).json({ message: "Course deleted successfully" });
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    }
    catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports = router;
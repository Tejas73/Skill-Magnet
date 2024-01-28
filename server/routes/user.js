const express = require('express');
const jwt = require('jsonwebtoken');
const { User, Course } = require('../db/db');
const { userSecKey, userAuthenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.get("/me", userAuthenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
        res.status(403).json("User does not exist");
        return
    } else {
        res.json({
            username: user.username
        })
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(403).json('User already exists')
            }
            const newUser = new User({ username, password });
            await newUser.save();

            const token = jwt.sign({ username, role: 'User' }, userSecKey, { expiresIn: '1h' });
                        res.json({ message: "User created successfully", token });
        } else {
            res.status(400).json('Username and password are required')
        }
    }
    catch (error) {
        // Log the error for debugging
        console.error('Error in /signup:', error);

        // Send a more informative response
        if (error.code === 11000) {
            res.status(400).json('Username is already taken');
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const user = await User.findOne({ username, password });
            if (user) {
                const token = jwt.sign({ username, role: 'User' }, userSecKey, { expiresIn: '1h' })
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

//to show the courses
router.get('/courses', userAuthenticateJwt, async (req, res) => {
    console.log("token")
    try {
        const courses = await Course.find({});
        res.json({ courses })
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//to purchase a course
router.post('/courses/:courseId', userAuthenticateJwt, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        console.log(course);
        if (course) {
            const user = await User.findOne({ username: req.username });
            if (user) {
                user.purchasedCourse.push(user);
                res.json({ message: 'Course purchased successfully' });
            }
            else {
                res.status(404).json({ message: 'User not found' })
            }
        }
        else {
            res.status(404).json({ message: 'Course not found' })
        }
    }
    catch (error) {
        console.error('Error came:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//to show the purchased course
router.get('/purchasedCourse', userAuthenticateJwt, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username }).populate('purchasedCourse');
        if (user) {
            res.json({ purchasedCourse: user.purchasedCourse || [] })
        }
        else {
            res.status(404).json({ message: 'User not found' })
        }
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
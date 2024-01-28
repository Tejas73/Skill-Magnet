const mongoose = require('mongoose');
//here i defined schemas and models

const userSchema = new mongoose.Schema({
    username: { type: String },
    password: String,
    purchasedCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}

)
const adminSchema = new mongoose.Schema({
    username: { type: String },
    password: String,
}
)
const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String
})

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

module.exports = {
    User,
    Admin,
    Course
}


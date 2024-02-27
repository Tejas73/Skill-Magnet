const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter=require("./routes/user");
const adminRouter=require("./routes/admin");


const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);

let dbURL;
// Connection URL for the MongoDB database
if (process.env.MONGODB_URI) {
  // If MONGODB_URI is defined, assign its value to dbURL
  dbURL = process.env.MONGODB_URI;
  } else {
  // If MONGODB_URI is not defined, log a message indicating it's missing
  console.error("MONGODB_URI environment variable is not defined.");
  // Optionally, you can exit the process or handle the error in some other way
  process.exit(1); // Exit the process with an error code (optional)
}

// Options for connecting to the database
const connectOptions = {
  useNewUrlParser: true,          // Use the new URL parser
  useUnifiedTopology: true,      // Use the new unified topology engine
  dbName: 'courses'              // Name of the database
};

// Establish a connection to the MongoDB database
mongoose.connect(dbURL, connectOptions)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });
app.listen(3000, () => console.log('Server running on port 3000')); 
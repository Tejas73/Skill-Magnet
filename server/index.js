const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter=require("./routes/user");
const adminRouter=require("./routes/admin");

const app = express();
// unnecessary cooommmmeennnnttt
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);

// Connection URL for the MongoDB database
const dbURL = 'mongodb+srv://TejasTech:lGzWKViaNTXdNr3c@cluster0.jvmlnkq.mongodb.net/';

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
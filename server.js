const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

// body-parser middleware
app.use(express.json());

const port = process.env.PORT || 8000;

// mongoDB connection
mongoose.connect(process.env.mongoDB_connection_string, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    () => {
        console.log("MongoDB connection established...");
    });


app.use("/users", require("./routes/userRouter"));




app.listen(port, () => {
    console.log(`The server is running on port http://localhost:${port}`);
});
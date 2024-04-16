const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const dbconfig =require("./db")
const cors = require("cors");
const socketIo = require('socket.io');

const taskRoute = require("./routes/taskRoute");
const userRoute = require("./routes/userRoute");

//middleware
app.use(express.json());
app.use(cors());

app.use("/api/task",taskRoute);
app.use("/api/user",userRoute);

app.listen(PORT, console.log(`server is running ${PORT}`));

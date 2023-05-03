import apiRoutes from "./routes/apiRoutes"
import authRoutes from "./routes/authRoutes"
import uploadRoutes from "./routes/uploadRoutes"
import downloadRoutes from "./routes/downloadRoutes"
// const express = require("express");
import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import passportConfig from "./lib/passportConfig"
import cors from "cors"
import fs from "fs"


// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const passportConfig = require("./lib/passportConfig");
// const cors = require("cors");
// const fs = require("fs");

// MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/jobPortal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

const app = express();
const port = 4444;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());


app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/upload", uploadRoutes);
app.use("/host", downloadRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});

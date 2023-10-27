const express = require("express");
const app = express();
const cors = require("cors");
const {connection} = require("./config/config.js");
require("dotenv").config();

app.use(express.json());

app.listen(process.env.PORT, async()=>{
    try {
        await connection
        console.log("Successfully connected to the Database");
    } catch (err) {
      console.log("Error while connecting to the Database");
      console.log(err);
    }
    console.log(`This server is running at port ${process.env.PORT}`);
})
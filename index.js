const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./config/config.js");
require("dotenv").config();
const invoiceModel = require("./models/invoiceModel.js");

app.use(express.json());

app.post("/api/create", async (req, res) => {
  const { invoiceDate, invoiceNumber, invoiceAmount } = req.body;

  try {
    // Check if the invoiceNumber already exists
    const existingInvoice = await invoiceModel.findOne({ invoiceNumber });

    if (existingInvoice) {
      return res.status(400).json({ error: "Invoice number already exists" });
    }

    // Validate invoiceDate against previous and next invoice
    const prevInvoice = await invoiceModel.findOne({
      invoiceNumber: invoiceNumber - 1,
    });
    const nextInvoice = await invoiceModel.findOne({
      invoiceNumber: invoiceNumber + 1,
    });

    if (prevInvoice && invoiceDate <= prevInvoice.invoiceDate) {
      return res.status(400).json({ error: "Invalid invoice date" });
    }

    if (nextInvoice && invoiceDate >= nextInvoice.invoiceDate) {
      return res.status(400).json({ error: "Invalid invoice date" });
    }

    const newInvoice = new Invoice({
      invoiceDate,
      invoiceNumber,
      invoiceAmount,
    });

    await newInvoice.save();

    return res.status(200).json({ message: "Invoice created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Successfully connected to the Database");
  } catch (err) {
    console.log("Error while connecting to the Database");
    console.log(err);
  }
  console.log(`This server is running at port ${process.env.PORT}`);
});

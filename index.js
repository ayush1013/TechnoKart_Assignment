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
    function getFinancialYear(date) {
      const newDate = new Date(date)
      // console.log("date", date)
      console.log("newDate", newDate)
      const year = newDate.getFullYear();
      const month = newDate.getMonth();
      // console.log("month", month)
      // console.log("year", year)
    
      if (month >= 3) {
        return `${year}-${year + 1}`;
      } else {
        return `${year - 1}-${year}`;
      }
    }
    // console.log(getFinancialYear(invoiceDate))
    const financialYear = getFinancialYear(invoiceDate);
    console.log(financialYear)
    // Check if the invoiceNumber already exists

    const checkInvoiceNumber = `${invoiceNumber}-${financialYear}`

    const existingInvoice = await invoiceModel.find({ invoiceNumber:checkInvoiceNumber });
    console.log("existingInvoice",existingInvoice);

    // if (existingInvoice.length > 0) {
    //   return res.status(400).json({ error: "Invoice number already exists" });
    // }

    // Validate invoiceDate against previous and next invoice
    
    const prevInvoices = await invoiceModel.find({invoiceDate:{$lte:invoiceDate}})
    const nextInvoces = await invoiceModel.find({invoiceDate:{$gte:invoiceDate}})

    console.log("prevInvoices",prevInvoices);
    console.log("nextInvoces",nextInvoces);

    const newInvoice = new invoiceModel({
      invoiceDate,
      invoiceNumber: checkInvoiceNumber,
      invoiceAmount
    });

    // await newInvoice.save();

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

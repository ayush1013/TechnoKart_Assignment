const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./config/config.js");
require("dotenv").config();
const invoiceModel = require("./models/invoiceModel.js");

app.use(express.json());

app.get("/api", async (req, res) => {
  const { invoiceDate, invoiceNumber,financialYear } = req.query;

  try {
    // let invoices;
    let query = {};

    if(invoiceNumber){
      query.number = invoiceNumber;
    }else if(financialYear){
      query.financialYear = financialYear
    }else if(invoiceDate){
      query.invoiceDate = invoiceDate
    }else if(invoiceDate && financialYear){
      query.invoiceDate = invoiceDate
      query.financialYear = financialYear
    }else{
      query = {};
    }
    
    let  invoices = await invoiceModel.find(query);

    res.send({ data: invoices });
  } catch (err) {
    console.error("Error fetching invoices:", err);
    res.status(500).send({ message: "Internal server error" });
  }

});

app.post("/api/create", async (req, res) => {
  const { invoiceDate, invoiceNumber, invoiceAmount } = req.body;
  

  try {
    function getFinancialYear(date) {
      const newDate = new Date(date);
      // console.log("date", date)
      console.log("newDate", newDate);
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
    console.log(financialYear);
    // Check if the invoiceNumber already exists

    const checkInvoiceNumber = `${invoiceNumber}-${financialYear}`;

    const existingInvoice = await invoiceModel.find({
      invoiceNumber: checkInvoiceNumber,
    });
    // console.log("existingInvoice",existingInvoice);

    if (existingInvoice.length > 0) {
      return res.status(400).json({ error: "Invoice number already exists" });
    }

    // Retrieve the previous and next invoices (if they exist)
    const prevInvoice = await invoiceModel.find({
      invoiceDate: { $lte: invoiceDate },
    });

    const nextInvoice = await invoiceModel.find({
      invoiceDate: { $gte: invoiceDate },
    });
    console.log("prevInvoice", prevInvoice);
    console.log("nextInvoice", nextInvoice);

    // Validate invoiceDate against previous and next invoice
    function convertToNumber(num) {
      let number = num.split("-").map(Number)[0];
      return number;
    }

    // console.log("number", convertToNumber(nextInvoice[0].invoiceNumber))

    if (
      prevInvoice.length > 0 &&
      financialYear === prevInvoice[prevInvoice.length - 1].financialYear &&
      invoiceNumber <
        convertToNumber(prevInvoice[prevInvoice.length - 1].invoiceNumber)
    ) {
      console.log("prevInvoice date condition");
      return res.status(400).json({ error: "Invalid invoice date" });
    }

    if (
      nextInvoice.length > 0 && 
      financialYear === nextInvoice[0].financialYear &&
      invoiceNumber > convertToNumber(nextInvoice[0].invoiceNumber)
    ) {
      console.log("nextInvoice date condition");
      return res.status(400).json({ error: "Invalid invoice date" });
    }

    const newInvoice = new invoiceModel({
      invoiceDate,
      invoiceNumber: checkInvoiceNumber,
      invoiceAmount,
      number: invoiceNumber,
      financialYear
    });

    await newInvoice.save();

    return res.status(200).json({ message: "Invoice created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.patch("/api/update/:id", async(req,res)=>{
  const payload = req.body
  const id = req.params.id

  try {
    await invoiceModel.findByIdAndUpdate({_id: id}, payload);
    res.send("invoice updated successfuly")
  } catch (err) {
    res.send("invoice could not be upadated");
  }
})

app.delete("/api/delete/:id", async(req,res)=>{
  const id = req.params.id
  try {
    await invoiceModel.findByIdAndDelete({_id: id});
    res.send("invoice deleted successfuly")
  } catch (err) {
    res.send("invoice could not be deleted");
  }
})

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

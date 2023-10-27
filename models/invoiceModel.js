const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceDate: { type: Date, required: true },
  invoiceNumber: { type: Number, required: true, unique: true },
  invoiceAmount: { type: Number, required: true },
});

const invoiceModel = mongoose.model("Ivoices", invoiceSchema);

module.exports = invoiceModel;

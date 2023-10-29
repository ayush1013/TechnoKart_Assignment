const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceDate: { type: String, required: true },
  invoiceNumber: { type: String, required: true},
  invoiceAmount: { type: Number, required: true },
  number: { type: Number, required: true },
  financialYear :{ type: String, required: true}
});

const invoiceModel = mongoose.model("Ivoices", invoiceSchema);

module.exports = invoiceModel;

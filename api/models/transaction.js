const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TransactionSchema = new Schema({
  monthlyIncome: { type: Number, required: true },
});

const TransactionModel = model("Transaction", TransactionSchema);

module.exports = TransactionModel;

// const mongoose = require("mongoose");

// const TransactionSchema = new mongoose.Schema({
//   monthlyIncome: { type: Number, required: true },
// });

// const TransactionModel = mongoose.model("Transaction", TransactionSchema);

// module.exports = TransactionModel;

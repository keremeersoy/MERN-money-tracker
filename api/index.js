const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Transaction = require("./models/transaction");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

// app.get("/api/test", (req, res) => {
//   res.json("test ok2");
// });

app.post("/api/money-tracker", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { monthlyIncome } = req.body;
  const transaction = await Transaction.create({ monthlyIncome });
  res.json(transaction);
});

app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(4000);

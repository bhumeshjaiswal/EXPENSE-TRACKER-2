const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Expense = require("./models/expense"); // because your file is expense.js

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/expenseDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Add expense
app.post("/add-expense", async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.json({ message: "Expense Added" });
});

// Get all expenses
app.get("/expenses", async (req, res) => {
  const data = await Expense.find();
  res.json(data);
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

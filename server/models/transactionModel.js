const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    type: {
      type: String,
      // enum: ["income", "expense"],
      required: [true, "type is required"],
    },
    category: {
      type: String,
      // enum: ['food', 'transport', 'entertainment', 'utilities', 'other'],
      required: true,

    },
    description: {
      type: String,
      required: true,
    },

    transactionType: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
const transactionModel = mongoose.model("Transaction", transactionSchema);
module.exports = transactionModel;

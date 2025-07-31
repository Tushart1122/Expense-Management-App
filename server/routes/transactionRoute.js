const express = require("express");
const {
  addTranansaction,
  getAllTransactions,
  editTranansaction,
  DeleteTransaction,
} = require("../controllers/transactionCtrl");

const router = express.Router();

// POST Routes
router.post("/add-transaction", addTranansaction);
router.post("/edit-transaction", editTranansaction);
router.post("/delete-transaction", DeleteTransaction);
router.post("/get-all-transactions", getAllTransactions);

module.exports = router;

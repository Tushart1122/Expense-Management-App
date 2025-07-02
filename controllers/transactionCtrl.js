const transactionModel = require("../models/transactionModel");
const moment = require("moment");
const getAllTransactions = async (req,res)=>{
try{
  const {frequency,selectedDate,type} = req.body;
  const transactions = await transactionModel.find({
    ...(frequency !=='custom' ? {
      date:{
        $gt : moment().subtract(Number(frequency), "days").toDate(),
      },
    } :{
      date :{
        $gt :selectedDate[0],
        $lte :selectedDate[1]
      }
    }),
    userId: req.body.userId,
    ...(type !== 'all' && {type})
  });
  res.status(200).json(transactions);
}
catch(error){
  res.status(500).json({message: "Error fetching transactions"});
}
};
const DeleteTransaction = async(req,res)=>{
  try{
    await transactionModel.findOneAndDelete(
      { _id: req.body.transactionId })
      res.status(200).send({message: "Transaction deleted successfully"});
  }
  catch(error){
    res.status(500).json({message: "Error deleting transaction"});
  }
};
const editTranansaction = async( req,res) =>{
  try{
      await transactionModel.findOneAndUpdate(
        { _id: req.body.transactionId},req.body.payload,);
        res.status(200).send({message: "Transaction updated successfully"});
  }catch(error){
    res.status(500).json({message: "Error editing transaction"});
}
};
const addTranansaction = async(req,res)=>{
  try{
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).json({message: "Transaction added successfully", transaction: newTransaction});
  }catch(error){
    res.status(500).json({message: "Error adding transaction"});
  }
};


module.exports = {
  getAllTransactions,
  addTranansaction,
  DeleteTransaction,
  editTranansaction
};

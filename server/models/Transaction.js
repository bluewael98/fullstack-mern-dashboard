import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema( // mongoose schema defines structure of data, to model MongoDB library
 {
  userId: String,
  cost: String,
  products: {
    type: [mongoose.Types.ObjectId],
    of: Number,
  }

 }, {timestamps: true }
 );

const Transaction = mongoose.model("Transaction", TransactionSchema);  // creating product model
export default Transaction; 
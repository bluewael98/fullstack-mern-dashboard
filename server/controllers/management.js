import mongoose from "mongoose";
import User from "../models/User.js"
import Transaction from "../models/Transaction.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getUserPerformance = async (req, res) =>{
try {
  const { id } = req.params;

  const userWithStats = await User.aggregate([ //aggregate call 
    { $match: { _id: new mongoose.Types.ObjectId(id)}}, // Grabbing user id from User model -  converting it into the correct mongoose object id format
    {
    $lookup: {  
      from: "affiliatestats", //referencing from user data base to affiliate stat database, grabing the relevant information
      localField: "_id",  // 
      foreignField: "userId",
      as: "affiliateStats", // displaying information as affiliate stats
    },
    },
    { $unwind: "$affiliateStats"} //flatten the array or object
  ]);

  const saleTransactions = await Promise.all(
    userWithStats[0].affiliateStats.affiliateSales.map((id)=> {
      return Transaction.findById(id)
    })
  );

  const filteredSaleTransactions =  saleTransactions.filter( // filtering to make sure we dont get any empty transactions
    (transaction) => transaction !== null
  )
  
  res.status(200).json({user: userWithStats[0], sales: filteredSaleTransactions});
} catch (error) {
  res.status(404).json({ message: error.message });
}
}
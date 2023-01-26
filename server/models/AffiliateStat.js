import mongoose from "mongoose";

const AffiliateStatSchema = new mongoose.Schema( // mongoose schema defines structure of data, to model MongoDB library
 {
    userId: { type: mongoose.Types.ObjectId, ref: "User"},
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: "Transaction"
    }

 }, {timestamps: true }
 );

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);  // creating product model
export default AffiliateStat; 
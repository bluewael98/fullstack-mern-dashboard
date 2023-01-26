import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema( // mongoose schema defines structure of data, to model MongoDB library
 {
  name: String,
  price: Number,
  description: String,
  category: String,
  rating: Number,
  supply: Number

 }, {timestamps: true }
 );

const Product = mongoose.model("Product", ProductSchema);  // creating product model
export default Product; 
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js"
import getCountryIso3 from "country-iso-2-to-3"

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // first find products

    const productsWithStats = await Promise.all(
      products.map(async (product) => { // loop through products
        const stat = await ProductStat.find({ // find product stat
          productId: product._id              // product stat will be found based on product id
        })
        return {    // returning array of objects with the product information combined with stat information
          ...product._doc,  
          stat,
        }
      })
    );

    res.status(200).json(productsWithStats)
  } catch (error) {
    res.status(404).json({ message: error.message }) 
  }
};



export const getCustomers = async (req, res) => { 
  try {
    const customers = await User.find({ role: "user" }).select("-password");  //used the user import, find role user and remove password from data presented to front-end
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



export const getTransactions = async (req, res) => {
  try {

    // sort should look like this: {"field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = ""} = req.query; // destructing query parameters from the query request and assigning default values

    //formatted sort should look like { userId: -1}
    const generateSort = () => { // creating descending/ascending function
      const sortParsed = JSON.parse(sort); // parsing the above sort into an object
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1), 
      };

      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {}; // if the sort var is truthy (not null, undefined or false), the generate sort function is executed and its returned value is assigned to sort formatted, else empt obj returned

    const transactions = await Transaction.find({ // creating search function to query database for transactions
      $or: [ //$or allows us to search multiple field
        { cost: { $regex: new RegExp(search, "i") } }, //$regex is an operator in MongoDB that allows you to search for specific strings within a field
        { userId: { $regex: new RegExp(search, "i") } }, // the i  flag makes the search case insensitive
       
    ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

      const total = await Transaction.countDocuments({
        name: { $regex: search, $options: "i"}
      });


    res.status(200).json({
      transactions,
      total,
    });
     
  } catch (error) {
    res.status(404).json({ message: error.message });
    
  }
};


export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc [countryISO3]++;
      return acc;

    },{} );

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return {id: country, value: count};
      }
    );

    res.status(200).json(formattedLocations);
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
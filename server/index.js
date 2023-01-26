import express from 'express';
import bodyParser from 'body-parser'; // middleware that parses (interpretes the data) data sent in through req, then made available to route handling in convenient form such as Javascript obj
import mongoose from 'mongoose';
import cors from 'cors'; // secirity feature that controls whethere a webpage on one domain can can access resources on another domain, useful middleware for front-end and back-end running on diff domains
import dotenv from 'dotenv'; // allows to store sensitive info in .env files, which load at runtime. keeps sensitive information out of version control systems like git, away from public
import helmet from 'helmet'; // security system that sets http headers to prevent express application from common vulnerabilities 
import morgan from 'morgan'; // logs incoming requests to application such as route hit, status code, time to completion. important for debugging and monitoring app
import clientRoutes from './routes/client.js' 
import generalRoutes from './routes/general.js'
import managementRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'

// data imports 
import User from "./models/User.js";
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from "./data/index.js";
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import AffiliateStat from './models/AffiliateStat.js';


/* CONFIGURARTION */
dotenv.config(); // load environment variables from the .env file
const app = express(); 
app.use(express.json()); // use json middleware to parse jeson request bodies
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"})); // configured helmet to use Cross Origin Policy to mitigate CSRF (cross site request-forgery)
app.use(morgan("common")) // use morgan to log incoming requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) // false = data parsed in a traditional way of key-value pairs seperated by &/=
app.use(cors()); // use cors middleware to handle 'cross origin requests'

/* ROUTES */
app.use ("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/*MONGOOSE SETUP*/ 
const PORT = process.env.PORT  || 9000; // use port number set in env file or set to 9000
mongoose.connect(process.env.MONGO_URL, { // connect to the mongo db using the MONGO_URL var
  useNewUrlParser: true,  // use the new url parser
  useUnifiedTopology: true,  // use the new server and discovery monitoring engine
})
.then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`)); // starts server and listens to specified port

  /* ONLY ADD DATA ONE TIME*/
  //AffiliateStat.insertMany(dataAffiliateStat);
 //User.insertMany(dataUser);
 //Product.insertMany(dataProduct);
 //ProductStat.insertMany(dataProductStat);
 //Transaction.insertMany(dataTransaction);
 //OverallStat.insertMany(dataOverallStat);

})
.catch((error) => console.log(`${error} did not connect`));

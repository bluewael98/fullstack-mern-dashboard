import express from "express";
import { getProducts, getCustomers, getTransactions, getGeography} from "../controllers/client.js"

const router = express.Router(); // creating const router, used as middleware to provide routing to different endpoints
router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router; 
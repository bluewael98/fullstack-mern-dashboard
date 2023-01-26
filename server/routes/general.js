import express from "express";
import { get } from "mongoose";
import { getUser, getDashboardStats } from "../controllers/general.js"; // imported from controllers to GET Id


const router = express.Router(); 

router.get("/user/:id", getUser); // GET route on the router for the endpoint /user/:id
router.get("/dashboard", getDashboardStats);

export default router; 
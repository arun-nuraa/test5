import express from "express";
import authMiddleware from "../middleware/auth.js";
import { llistOrders, placeOrder, updateStatus, luserOrders, verifyOrder } from "../controllers/localorderController.js";

const localorderRouter = express.Router();
localorderRouter.post("/localplace",authMiddleware,placeOrder);
localorderRouter.post("/verify",verifyOrder);
localorderRouter.post("/luserorders",authMiddleware,luserOrders);
localorderRouter.get('/llist',llistOrders);
localorderRouter.post("/status",updateStatus);

export default localorderRouter;
import { Router } from "express";
import payments from "../controllers/payments.js";
const router = Router();

router.post("/create-payment-intent", payments.createPaymentIntent);

export default router;

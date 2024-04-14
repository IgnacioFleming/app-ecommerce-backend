import { Router } from "express";
import { passportCall } from "../middlewares/auth/passportCall.js";
import { applyPolicy } from "../middlewares/policies/policies.js";
import { getTicketsByPurchaser } from "../controllers/tickets.js";

const router = Router();

router.get("/", passportCall("jwt"), applyPolicy(["PUBLIC"]), getTicketsByPurchaser);

export default router;

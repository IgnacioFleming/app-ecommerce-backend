import { Router } from "express";
import { passportCall } from "../middlewares/auth/passportCall.js";
import { applyPolicy } from "../middlewares/policies/policies.js";
import { getAllTickets, getTicketsByPurchaser } from "../controllers/tickets.js";

const router = Router();

router.get("/", passportCall("jwt"), applyPolicy(["ADMIN"]), getAllTickets);

router.get("/:purchaser", passportCall("jwt"), applyPolicy(["PUBLIC", "ADMIN"]), getTicketsByPurchaser);

export default router;

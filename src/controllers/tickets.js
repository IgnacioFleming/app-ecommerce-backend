import { ticketService } from "../services/index.js";

export const getTicketsByPurchaser = async (req, res) => {
  try {
    const { purchaser } = req.body;
    const { status, payload } = await ticketService.getByPurchaser(purchaser);
    res.send({ status, payload });
  } catch (error) {
    throw new Error(error);
  }
};

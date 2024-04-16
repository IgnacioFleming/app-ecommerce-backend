import { ticketService } from "../services/index.js";

export const getTicketsByPurchaser = async (req, res) => {
  try {
    const { purchaser } = req.params;

    const { status, payload } = await ticketService.getByPurchaser(purchaser);
    res.send({ status, payload });
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const { status, payload } = await ticketService.get();
    res.send({ status, payload });
  } catch (error) {
    throw new Error(error);
  }
};

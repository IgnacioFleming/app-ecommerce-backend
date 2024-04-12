import { ticketModel } from "../models/ticket.model.js";

class TicketManager {
  constructor() {}
  get = async () => {
    try {
      const tickets = await ticketModel.find().lean();
      return { status: "success", payload: tickets };
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const ticket = await ticketModel.findById(id);
      return { status: "success", payload: ticket };
    } catch (error) {
      throw new Error(error);
    }
  };
  getByPurchaser = async (purchaser) => {
    try {
      const purchaserTickets = await ticketModel.find({ email: purchaser }).lean();
      return { status: "success", payload: purchaserTickets };
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default TicketManager;

import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  purchase_datetime: String,
  amount: Number,
  purchaser: String,
  products: {
    type: [
      {
        product: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "products",
        },
        quantity: Number,
      },
    ],
  },
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);

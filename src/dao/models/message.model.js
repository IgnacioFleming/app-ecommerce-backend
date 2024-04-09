import mongoose from "mongoose";

const messagesCollection = "messages";

const messagesSchema = new mongoose.Schema({
  userId: String,
  text: String,
  timestamp: Date,
  isReply: Boolean,
});

export const messagesModel = mongoose.model(messagesCollection, messagesSchema);

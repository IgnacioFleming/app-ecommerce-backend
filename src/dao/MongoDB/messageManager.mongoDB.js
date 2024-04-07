import { messagesModel } from "../models/message.model.js";
export default class MessageManager {
  constructor() {}
  get = async () => {
    try {
      const messages = await messagesModel.find();
      return {
        status: "success",
        payload: messages,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const message = await messagesModel.findById(id);
      return { status: "success", payload: message };
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (message) => {
    try {
      const newMessage = await messagesModel.create(message);
      return { status: "success", payload: newMessage };
    } catch (error) {
      throw new Error(error);
    }
  };
  update = async (id, message) => {
    try {
      const updatedMessage = await messagesModel.findByIdAndUpdate(id, message);
      return { status: "success", payload: updatedMessage };
    } catch (error) {
      throw new Error(error);
    }
  };
  delete = async (id) => {
    try {
      const deletedMessage = await messagesModel.findByIdAndDelete(id);
      return { status: "success", payload: deletedMessage };
    } catch (error) {
      throw new Error(error);
    }
  };
}

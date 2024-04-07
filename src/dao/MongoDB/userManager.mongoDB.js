import { userModel } from "../models/user.model.js";

class UserManager {
  constructor() {}
  get = async () => {
    try {
      const users = await userModel.find();
      return {
        status: "success",
        payload: users,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  getOne = async (query) => {
    try {
      const user = await userModel.findOne(query);
      return { status: "success", payload: user };
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const user = await userModel.findById(id);
      return { status: "success", payload: user };
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (user) => {
    try {
      const newUser = await userModel.create(user);
      return { status: "success", payload: newUser };
    } catch (error) {
      throw new Error(error);
    }
  };
  update = async (query, update) => {
    try {
      const updatedUser = await userModel.updateOne(query, update);
      return { status: "success", payload: updatedUser };
    } catch (error) {
      throw new Error(error);
    }
  };
  delete = async (id) => {
    try {
      const deletedUser = await userModel.findByIdAndDelete(id);
      return { status: "success", payload: deletedUser };
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default UserManager;

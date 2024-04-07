export default class MessageRepository {
  constructor(dao) {
    this.dao = dao;
  }
  async get() {
    try {
      const result = await this.dao.get();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getById(id) {
    try {
      const result = await this.dao.getById(id);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async create(message) {
    try {
      const result = await this.dao.create(message);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(id, message) {
    try {
      const result = await this.dao.update(id, message);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async delete(id) {
    try {
      const result = await this.dao.delete(id);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default class TicketRepository {
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
}

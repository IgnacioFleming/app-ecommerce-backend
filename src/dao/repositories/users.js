export default class UsersRepository {
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

  async getOne(query) {
    try {
      const result = await this.dao.getOne(query);
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
  async create(user) {
    try {
      const result = await this.dao.create(user);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(query, update) {
    try {
      const result = await this.dao.update(query, update);
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
  async uploadProfileImage(id, fileURL) {
    try {
      const result = await this.dao.uploadProfileImage(id, fileURL);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

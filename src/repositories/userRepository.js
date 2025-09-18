import User from "../models/userModel.js";

class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findById(id) {
    return await User.findById(id);
  }
  async updateById(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }
}

export default new UserRepository();

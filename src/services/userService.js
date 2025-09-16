import userRepository from "../repositories/userRepository.js";
import generateToken from "../utils/token.js";

class UserService {
  async registerUser({ name, email, password }) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const user = await userRepository.create({ name, email, password });
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
  }

  async loginUser({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error("Invalid email or password");

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
  }
}

export default new UserService();

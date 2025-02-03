import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userService = {
  async register(email, password) {
    const user = await User.findOne({email});
    if(user){
        throw new Error("Already exists");
    }

    const createdUser = await User.create({ email, password });

    return generateResponse(createdUser);
  },

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid input");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Invalid input");
    }

    return generateResponse(user);
  },

  logout(){
    return true;
  }
};

function generateResponse(user) {
  const payload = { _id: user._id, email: user.email };

  const token = jwt.sign(payload, "MYSECRET", { expiresIn: "2h" });
  return { email: user.email, accessToken: token, _id: user._id };
}

export default userService;

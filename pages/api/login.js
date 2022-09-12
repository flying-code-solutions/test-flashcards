import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../models/User";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).send(`There is no user with e-mail ${email}!`);
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if (passMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
      });
      res.status(200).json(token);
    } else {
      res.status(401).send("Incorrect password!");
    }

  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to login, please try again later.");
  }
}
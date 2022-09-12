import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isLength from "validator/lib/isLength";
import isEmail from "validator/lib/isEmail";

import User from "../../models/User";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // todo input sanitation
    if (!isLength(name, { min: 2, max: 20 })) {
      return res.status(422).send("Name must have 2-20 characters!");
    } else if (!isLength(password, { min: 8 })) {
      return res.status(422).send("Password must have at least 8 characters!");
    } else if (!isEmail(email)) {
      return res.status(422).send("Invalid e-mail address!");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).send(`User with e-mail ${email} already exists.`);
    }
    const passHash = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: passHash
    }).save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to create user, please try again later.");
  }
}
import jwt from "jsonwebtoken";
import User from "../../models/User";

export default async (req, res) => {
  const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

  if (!userId) {
    res.status(401).send("User authentication failed!");
  }
  try {
    const user = await User.findOne({ _id: userId });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to get user.");
  }
}
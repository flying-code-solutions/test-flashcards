import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId, String } = Schema.Types;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"]
  },
  stacks: [
    {
      type: ObjectId,
      ref: "Stack"
    }
  ]
});

export default mongoose.models.User
  || mongoose.model("User", UserSchema);
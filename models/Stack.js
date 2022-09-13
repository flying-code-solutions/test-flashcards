import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId, String } = Schema.Types;

const StackSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    ref: "User"
  },
  cards: [
    {
      type: ObjectId,
      ref: "Flashcard"
    }
  ]
});

export default mongoose.models.Stack
  || mongoose.model("Stack", StackSchema)
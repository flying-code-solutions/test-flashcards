import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const StackSchema = new Schema({
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
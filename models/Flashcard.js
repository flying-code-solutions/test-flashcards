import mongoose from "mongoose";

const { Schema } = mongoose;
const { String, ObjectId } = Schema.Types;

const FlashcardSchema = new Schema({
  front: {
    type: String,
    required: true
  },
  back: {
    type: String,
    required: true
  },
  stack: {
    type: ObjectId,
    ref: "Stack"
  }
});

export default mongoose.models.Flashcard
  || mongoose.model("Flashcard", FlashcardSchema);
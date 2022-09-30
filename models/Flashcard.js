import mongoose from "mongoose";

const { Schema } = mongoose;
const { String } = Schema.Types;

const FlashcardSchema = new Schema({
  titleFront: {
    type: String,
    required: true
  },
  contentFront: {
    type: String,
    required: false
  },
  titleBack: {
    type: String,
    required: true
  },
  contentBack: {
    type: String,
    required: false
  }
});

export default mongoose.models.Flashcard
  || mongoose.model("Flashcard", FlashcardSchema);
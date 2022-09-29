import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId, String } = Schema.Types;

const CardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: ObjectId,
    ref: "User"
  }
});

export default mongoose.models.Card
  || mongoose.model("Card", CardSchema)
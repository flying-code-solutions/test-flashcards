import jwt from "jsonwebtoken";
import Flashcard from "../../models/Flashcard";
import Stack from "../../models/Stack";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    default:
      res.status(405).send("Request method not allowed!");
  }
}

async function handleGetRequest(req, res) {
  const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
  if (!userId) {
    res.status(401).send("Invalid token!");
  }
  try {
    const flashcards = await Flashcard.find();
    if (flashcards) {
      res.status(200).json(flashcards);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to get flashcards.");
  }
}

async function handlePostRequest(req, res) {
  const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
  if (!userId) {
    res.status(401).send("Invalid token!");
  }
  try {
    const { titleFront, contentFront, titleBack, contentBack } = req.body.cardData;
    const { stackId } = req.body;
    const card = await new Flashcard({
      titleFront,
      contentFront,
      titleBack,
      contentBack
    }).save();
    await Stack.findOneAndUpdate(
      { _id: stackId },
      { $addToSet: { cards: card._id } }
    );
    res.status(201).send("Card created.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to create flashcard.");
  }
}
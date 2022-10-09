import XLSX from "xlsx";
import formidable from "formidable";

import Stack from "../../models/Stack";
import Flashcard from "../../models/Flashcard";

export const config = {
  api: {
    bodyParser: false
  }
}

export default async (req, res) => {
  const form = new formidable.IncomingForm();

  try {
    const data = await new Promise(function (resolve, reject) {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }

        try {
          const workbook = XLSX.readFile(files.file.filepath);
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonSheet = XLSX.utils.sheet_to_json(sheet);
          const parsedData = {
            file: jsonSheet,
            stackId: fields.stackId
          }
          resolve(parsedData);
        } catch (err) {
          reject(err);
        }
      });
    });
    console.log(data);
    for (let card of data.file) {
      const newCard = await new Flashcard({
        ...card
      }).save();
      console.log(newCard);
      await Stack.findOneAndUpdate(
        { _id: data.stackId },
        { $addToSet: { cards: newCard._id } }
      );
    }
  } catch (error) {
    console.log(error)
  }

  res.status(200).send();
}
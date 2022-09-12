import mongoose from "mongoose";

const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    console.log("Using existing DB connection.");
    return;
  }
  
  const db = await mongoose.connect(process.env.MONGO_SRV);
  console.log("DB connected.");

  connection.isConnected = db.connections[0].readyState;
}

export default connectDb;
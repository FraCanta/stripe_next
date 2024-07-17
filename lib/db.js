import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "production") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client
      .connect()
      .then((client) => {
        console.log("Connected to MongoDB");
        return client;
      })
      .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        throw err;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client
    .connect()
    .then((client) => {
      console.log("Connected to MongoDB");
      return client;
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      throw err;
    });
}

export default clientPromise;

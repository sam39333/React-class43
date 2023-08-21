const { MongoClient } = require("mongodb");

const mongoUrl = "mongodb://127.0.0.1:27017";
const dbName = "todoapp";

const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = {
  connectToDatabase,
  client,
  dbName
};

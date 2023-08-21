const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { client, dbName } = require("../db");

router.post("/save-columns", async (req, res) => {
  const { userId, column } = req.body;

  try {
    const db = client.db(dbName);
    const columnsCollection = db.collection("columns");

    const result = await columnsCollection.insertOne({
      userId: ObjectId(userId),
      column
    });

    res.status(200).json({ success: true, columnId: result.insertedId });
  } catch (error) {
    console.error("Error creating column:", error);
    res.status(500).json({ success: false, message: "Error creating column" });
  }
});

module.exports = router;

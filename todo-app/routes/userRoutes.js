const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { client, dbName } = require("../db");

router.post("/register", async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const usersCollection = client.db(dbName).collection("users");

  try {
    const existingUser = await usersCollection.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const newUser = { userName, password: hashedPassword };
    await usersCollection.insertOne(newUser);

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;

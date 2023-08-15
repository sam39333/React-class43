const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const users = [];

router.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ userName, password: hashedPassword });

    res.json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "An error occurred during registration." });
  }
});

module.exports = router;

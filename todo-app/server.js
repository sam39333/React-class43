const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const columnRoutes = require("./routes/columnRoutes");
const userRoutes = require("./routes/userRoutes");
const { connectToDatabase } = require("./db");

connectToDatabase();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", columnRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

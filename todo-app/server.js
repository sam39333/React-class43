const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const columnRoutes = require("./routes/columnRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(bodyParser.json());

app.use("/api", columnRoutes);
app.use("/api/user", userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

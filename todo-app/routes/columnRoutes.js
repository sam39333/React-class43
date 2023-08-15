const express = require("express");
const router = express.Router(); 

let columns = [];

router.get("/columns", (req, res) => {
  res.json(columns);
});



router.put("/columns/:id", (req, res) => {
  const { id } = req.params;
  const updatedColumn = req.body;

  
  const columnIndex = columns.findIndex((column) => column._id === id);

  if (columnIndex !== -1) {
    columns[columnIndex] = updatedColumn;
    res.json(updatedColumn);
  } else {
    res.status(404).json({ message: "Column not found" });
  }
});



router.post("/columns", (req, res) => {
 
  const newColumn = req.body;
  columns.push(newColumn);
  res.status(201).json(newColumn);
});

module.exports = router;

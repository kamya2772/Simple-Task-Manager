const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/tasks")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error Connecting to server", error);
  });

const taskSchema = new mongoose.Schema({
  name: String,
  email: String,
  Description: String,
});

const Task = mongoose.model("Task", taskSchema);

app.post("/api/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updateTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/api/tasks", async (req, res) => {
  try {
    const task = await Task.find();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server id running in http://localhost:${PORT}`);
});

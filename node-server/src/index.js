const express = require('express');
// Migrated from python-server/src/main.py using Copilot

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());

let tasks = [
  "Write a diary entry from the future",
  "Create a time machine from a cardboard box",
  "Plan a trip to the dinosaurs",
  "Draw a futuristic city",
  "List items to bring on a time-travel adventure",
];

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/tasks', (req, res) => {
  res.json({ tasks });
});

app.post('/tasks', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text is required' });
  tasks.push(text);
  return res.json({ message: 'Task added successfully' });
});

app.listen(port, () => {
  console.log(`Node server listening on port ${port}`);
});

module.exports = app;

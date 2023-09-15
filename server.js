const express = require('express');
const app = express();
const { readFromFile, readAndAppend } = require('./public/helpers/fsUtils');
const uuid = require('./public/helpers/uuid');
const path = require('path');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json')
    .then((data) => {
      res.json(JSON.parse(data));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to read data' });
    });
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json')
      .then(() => {
        res.status(201).json({ status: 'success', body: newNote });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Failed to append data' });
      });
  } else {
    res.status(400).json({ error: 'Both title and text are required' });
  }
});

app.listen(PORT, () => console.log("Listening on port " + PORT));

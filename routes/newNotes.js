const fb = require('express').Router();
const { readFromFile, readAndAppend } = require('../public/helpers/fsUtils');
const uuid = require('../public/helpers/uuid');

fb.get('/', (req, res) => {
  readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)));
});

fb.post('/', (req, res) => {
  const { title, content } = req.body;

  if (title && content) {
    const newNotes = {
      title,
      content,
      note_id: uuid(),
    };

    readAndAppend(newNotes, './db/db.json')
      .then(() => {
        const response = {
          status: 'success',
          body: newNotes,
        };
        console.info('New note created:', newNotes);
        res.json(response);
      })
      .catch((err) => {
        console.error('Error appending note:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } else {
    res.json('Error in posting newNote');
  }
});

module.exports = fb;

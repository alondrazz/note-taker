const fb = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the feedback
fb.get('/', (req, res) => {
    console.info(`${req.method} request received for newNotes`);
  
    readFromFile('./db/newNotes.json').then((data) => res.json(JSON.parse(data)));
  });

  
// POST Route for submitting feedback
fb.post('/', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to submit newNotes`);
  
  // Destructuring assignment for the items in req.body
  const { title, content } = req.body;

  // If all the required properties are present
  if (title && content) {
    // Variable for the object we will save
    const newNotes = {
      title,
      content,
      note_id: uuid(),
    };

    readAndAppend(newNotes, './db/newNotes.json');

    const response = {
      status: 'success',
      body: newNotes,
    };

    res.json(response);
  } else {
    res.json('Error in posting newNote');
  }
});

module.exports = fb;

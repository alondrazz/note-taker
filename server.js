const express = require('express');
const app = express();
// const fb = express.Router();
const { readFromFile, readAndAppend } = require('./public/helpers/fsUtils');
const uuid = require('./public/helpers/uuid');
const path = require('path');

const PORT = process.env.PORT || 3001

// GET Route for retrieving all the feedback
app.get('/', (req, res) => {
    console.info(`${req.method} request received for newNotes`);
    readFromFile('./db/newNotes.json').then((data) => res.json(JSON.parse(data)));
  });

    // Log that a POST request was received
  app.post('/', (req, res) => {
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

app.listen(PORT, ()=> console.log("listening on port "+ PORT))

//module.exports = fb;

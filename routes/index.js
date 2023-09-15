const express = require('express');
const notesRouter = require('./newNotes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/newNotes', notesRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});

module.exports = server;

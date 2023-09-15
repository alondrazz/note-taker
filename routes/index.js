const express = require('express');

// Import our files containing our routes
const notesRouter = require('./newNotes');

// Create an instance of express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Define the route for notes
app.use('/newNotes', notesRouter);

const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});

module.exports = app;

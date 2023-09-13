const express = require('express');

// Import our files containing our routes
const notesRouter = require('./routes/newNotes');

// Create and instance of express so we can apply the middleware and routing
const app = express();

app.use('./routes/newNotes', notesRouter);

module.exports = app;

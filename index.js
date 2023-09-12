const express = require('express');

// Import our files containing our routes
const noteTitleRouter = require('./noteTitle');
const notesRouter = require('./notes');

// Create and instance of express so we can apply the middleware and routing
const app = express();

app.use('/noteTitle', noteTitleRouter);
app.use('/notes', notesRouter);

module.exports = app;
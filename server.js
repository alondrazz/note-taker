const express = require('express');
const path = require('path');
const PORT = 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// This view route is a GET route for the homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// This view route is a GET route for the feedback page
//app.get('/feedback', (req, res) =>
  //res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
//);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

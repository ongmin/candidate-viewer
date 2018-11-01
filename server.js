const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const profilesUrl = 'https://reqres.in/api/users?page=1';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  fetch(profilesUrl)
    .then(res => res.json())
    .then(response => {
      console.log(response.data)
      res.send({ express: 'hi' });
    })
});

app.get('/api/profiles', (req, res) => {
  fetch(profilesUrl)
    .then(res => res.json())
    .then(response => {
      if (response) {
        res.send({ data: response.data });
      }
    })
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `Request: ${req.body.post}`,
  );
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));

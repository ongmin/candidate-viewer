const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const profilesUrl = 'https://reqres.in/api/users?page=';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/profiles/:id', (req, res) => {

  let id = req.params.id ? req.params.id : 1;

  fetch(profilesUrl + id)
    .then(res => res.json())
    .then(response => {
      if (response) {
        res.send({ 
          data: response.data,
          total_pages: response.total_pages 
        });
      }
    })
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));

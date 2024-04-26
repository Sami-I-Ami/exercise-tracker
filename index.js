const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

let users = []; // pretend this is actually a DB
let currentId = 0; // pretend this is an acutal key generator

// user endpoint
app.route('/api/users')
  .post(function(req, res) {
    // increase id
    currentId += 1;

    // create user object
    newUser = {
      username: req.body.username.toString(),
      _id: currentId.toString() // test only takes strings
    };

    // push to array
    users.push(newUser);

    // output
    res.json(newUser);
  })
  .get(function(req, res) {
    // output
    res.send(users);
  });

let log = [];

// exercise endpoint
app.post('/api/users/:_id/exercises', function(req, res) {
  // get user from _id
  
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

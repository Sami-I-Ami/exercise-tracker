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
    const newUser = {
      username: req.body.username.toString(),
      _id: currentId.toString() // test only takes strings
    };

    // push to array for later
    users.push(newUser);

    // output
    res.json(newUser);
  })
  .get(function(req, res) {
    // output
    res.send(users);
  });

let allData = [];

// exercise endpoint
app.post('/api/users/:_id/exercises', function (req, res, next) {
  // format date
  if (req.body.date) {
    req.time = new Date(req.body.date).toDateString();
  } else {
    req.time = new Date().toDateString();
  }
  next();
}, function(req, res) {
  // get user from _id
  const currentUser = users.find((user) => user._id == req.params._id);
  
  // create exercise object
  const exerciseData = {
    description: req.body.description,
    duration: parseFloat(req.body.duration),
    date: req.time
  }

  // put into log for later
  const userData = allData.find((user) => user._id == req.params._id);
  if (userData) {
    userData.log.push(exerciseData);
  } else {
    allData.push({...currentUser, log: [exerciseData]})
  }

  // output
  res.json({...currentUser, ...exerciseData});
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

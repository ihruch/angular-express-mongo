const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('./../models/user');

var mongoose = require('mongoose');
const db = 'mongodb://hruch:hruch23@ds245132.mlab.com:45132/eventsdb';
mongoose.connect(
  db,
  err => {
    if (err) {
      console.error('Error ' + err);
    } else {
      console.log('Connected to mongoDB');
    }
  }
);

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }

  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send('Unauthorized request');
  }
  let payload = jwt.verify(token, 'secretKey');
  if (!payload) {
    return res.status(401).send('Unauthorized request');
  }

  req.userId = payload.subject;
  next();
}

router.get('/', function(req, res) {
  res.send('From api router');
});

router.post('/register', (req, res) => {
  let userData = req.body;
  let user = new User(userData);

  user.save((error, registerUser) => {
    if (error) {
      console.log(error);
    } else {
      let payload = { subject: registerUser._id };
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).send({ token });
    }
  });
});

router.post('/login', (req, res) => {
  let userData = req.body;

  User.findOne({ emailInput: userData.emailInput }, (error, user) => {
    // console.log(emailInput);
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send('Invalid email');
      } else if (user.passInput !== userData.passInput) {
        res.status(401).send('invalid password');
      } else {
        let payload = { subject: user._id };
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({ token });
      }
    }
  });
});
router.get('/events', (req, res) => {
  let events = [
    {
      _id: '1',
      name: 'Auto Expo',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z'
    },
    {
      _id: '2',
      name: 'Auto Expo',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z'
    },
    {
      _id: '3',
      name: 'Auto Expo',
      description: 'lorem ipsum',
      date: '2015-04-02T18:25:43.511Z'
    },
    {
      _id: '4',
      name: 'Auto Expo',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z'
    },
    {
      _id: '5',
      name: 'Auto Expo',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z'
    },
    {
      _id: '6',
      name: 'Auto Expo',
      description: 'lorem ipsum',
      date: '2018-04-01T18:25:43.511Z'
    }
  ];
  res.json(events);
});

router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      _id: '1',
      name: 'Auto Expo Special',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z'
    },
    {
      _id: '2',
      name: 'Auto Expo Special',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z'
    },
    {
      _id: '3',
      name: 'Auto Expo Special',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z'
    },
    {
      _id: '4',
      name: 'Auto Expo Special',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z'
    },
    {
      _id: '5',
      name: 'Auto Expo Special',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z'
    },
    {
      _id: '6',
      name: 'Auto Expo Special',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z'
    }
  ];
  res.json(specialEvents);
});

module.exports = router;

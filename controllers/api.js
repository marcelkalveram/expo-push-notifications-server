const User = require('../models/User');
const Expo = require('expo-server-sdk');

// Create a new Expo SDK client
const expo = new Expo();

/**
 * GET /api
 * List of API examples.
 */
exports.getApi = (req, res) => {
  const response = {
    status: 'failure',
    message: 'you didn\'t pass valid parameters'
  };

  if (!req.query || !req.query.token || !req.query.email || !req.query.name) {
    return res.json(response);
  }

  const { email, name, token } = req.query;

  const user = new User({
    email,
    name,
    token
  });

  user.save((err) => {
    if (err) {
      response.message = 'couldn\'t save user, duplicate entry?';
      return res.json(response);
    }

    response.status = 'success';
    response.message = 'user successfully saved';

    res.json(response);
  });
};

exports.postNotification = (req, res) => {
  User.findOne({ email: req.params.email }, async (err, user) => {
    console.log(user.token);
    console.log(req.body.title);
    console.log(req.body.message);

    if (!Expo.isExpoPushToken(user.token)) {
      return console.error(`Push token ${user.token} is not a valid Expo push token`);
    }

    const message = {
      to: user.token,
      sound: 'default',
      title: req.body.title,
      body: req.body.message
    };

    const receipt = await expo.sendPushNotificationAsync(message);
    res.json({ message: receipt });
  });
};


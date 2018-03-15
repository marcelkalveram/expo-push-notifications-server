const User = require('../models/User');
const Expo = require('expo-server-sdk');

// Create a new Expo SDK client
const expo = new Expo();

/**
 * POST /user
 * Store a user's details
 */
exports.postUser = (req, res) => {
  const response = {
    status: 'failure',
    message: 'you didn\'t pass valid parameters'
  };

  const { email, name, token } = req.body;
  if (!email || !name || !token) {
    return res.json(response);
  }

  const user = new User({ email, name, token });

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

/**
 * POST /notificaion
 * Send a push notification to a user
 */
exports.postNotification = (req, res) => {
  User.findOne({ email: req.params.email }, async (err, user) => {
    if (!Expo.isExpoPushToken(user.token)) {
      return console.error(`Push token ${user.token} is not a valid Expo push token`);
    }

    const message = {
      to: user.token,
      sound: 'default',
      title: req.body.title,
      body: req.body.message,
    };

    const receipt = await expo.sendPushNotificationAsync(message);
    res.json({ message: receipt });
  });
};


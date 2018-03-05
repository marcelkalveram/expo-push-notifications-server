const User = require('../models/User');

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

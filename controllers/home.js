const User = require('../models/User');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  User.find((err, users) => {
    res.render('home', { users });
  });
};


const { Router } = require('express');

module.exports = Router().get('/login', (req, res) => {
  res.redirect(
    `https://slack.com/oauth/v2/authorize?scope=${process.env.SCOPE_TOKEN}&client_id=${process.env.CLIENT_ID}`
  );
});

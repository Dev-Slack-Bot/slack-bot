const express = require('express');
// const tips = require('./controllers/tips.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/users', require('./controllers/users.js'));
app.use('/api/v1/favorites', require('./controllers/favorites.js'));
app.use('/api/v1/funnys', require('./controllers/funnys.js'));
app.use('/api/v1/tips', require('./controllers/tips.js'));

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;

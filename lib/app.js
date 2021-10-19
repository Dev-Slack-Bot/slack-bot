const express = require('express');
import tips from '../lib/controllers/tips.js';


const app = express();

app.use(express.json());

app.use('/api/v1/funnys', require('./controllers/funnys.js'));
app.use('/api/v1/tips', tips);
app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;

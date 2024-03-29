const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require('cookie-session');
const { readdirSync } = require('fs');

const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./models/News');
require('./models/Conversation');
require('./models/Message');
require('./services/passport');

mongoose
  .connect(keys.mongoURI)
  .then(() => console.log('database connected successfully'))
  .catch((err) => console.log('error connecting to mongodb', err));

const app = express();
// app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
readdirSync('./routes').map((r) => app.use('/', require('./routes/' + r)));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//listen port
const PORT = process.env.PORT || 5000;
app.listen(PORT);

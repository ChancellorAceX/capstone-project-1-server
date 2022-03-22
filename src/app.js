require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const bestiaryRouter = require('./bestiary/bestiary-router');
const encounterRouter = require('./encounters/encounter-router');
const loginRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const campaignRouter = require('./campaigns/campaigns-router');
const characterRouter = require('./characters/character-router');

const app = express();

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}));
app.use(helmet());
app.use(cors({origin:['https://battlesource.vercel.app']}));

app.use('/api/bestiary', bestiaryRouter);
app.use('/api/login', loginRouter);
app.use('/api/encounter', encounterRouter);
app.use('/api/user', usersRouter);
app.use('/api/campaign', campaignRouter);
app.use('/api/character', characterRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
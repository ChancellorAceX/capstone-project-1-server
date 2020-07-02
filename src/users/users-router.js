const express = require('express');
const UsersService = require('./users-service');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { fullname, username, nickname, password } = req.body;

    for (const field of ['fullname', 'username', 'password', 'nickname'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });

    const passwordError = UsersService.validatePassword(password);
    if (passwordError) { return res.status(400).json({ error: passwordError }); }

    UsersService.hasUserWithUserName(req.app.get('db'), username)
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: 'Username already taken' });
        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = { fullname, username, nickname, password: hashedPassword };

            return UsersService.insertUser(req.app.get('db'), newUser)
              .then(user => res.status(201).json(UsersService.serializeUser(user))
              );
          });
      })
      .catch(next);
  });

module.exports = usersRouter;
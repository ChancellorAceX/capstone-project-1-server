const express = require('express');
const BestiaryService = require('./bestiary-service');
//const {requireAuth}=require('../middleware/jwt-auth');

const bestiaryRouter = express.Router();

bestiaryRouter
  .route('/')
  .get((req, res, next) => {
    console.log('hit the endpoint');
    BestiaryService.getAllBeasts(req.app.get('db'))
      .then(Beasts => { console.log('beasts', Beasts); return res.json(Beasts); })
      .catch(next);
  });

bestiaryRouter
  .route('/:bid')
  .get((req, res, next) => {
    BestiaryService.getById(req.app.get('db'), req.params.bid)
      .then(beast => res.json(beast));
  });
module.exports = bestiaryRouter;  
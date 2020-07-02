const express = require('express');
const EncounterService = require('./encounter-service');
const { requireAuth } = require('../middleware/jwt-auth');
const jsonBodyParser = express.json();

const encounterRouter = express.Router();

encounterRouter
  .route('/')
  .get(requireAuth, jsonBodyParser, (req, res, next) => {
    EncounterService.getAllUserEncounterData(req.app.get('db'), req.user.uid)
      .then(data => res.json(data))
      .catch(next);
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { encountername, encounterdesc, encountercampaignid } = req.body;
    const newEncounter = { encountername, encounterdesc, encountercampaignid };

    for (const [key, value] of Object.entries(newEncounter))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    EncounterService.insertEncounter(req.app.get('db'), newEncounter)
      .then(encounter => {
        res.status(201).json(EncounterService.serializeEncounter(encounter));
      })
      .catch(next);
  });

encounterRouter
  .route('/:encounterid')
  .get(requireAuth, jsonBodyParser, checkIfAuthorized, (req, res, next) => {
    EncounterService.getDetailedEncounterData(req.app.get('db'), req.params.encounterid)
      .then(data => res.json(data))
      .catch(next);
  })
  .delete(requireAuth, jsonBodyParser, checkIfAuthorized, (req, res, next) => {
    EncounterService.deleteEncounter(req.app.get('db'), req.params.encounterid)
      .then(() => res.json('Encounter Deleted'))
      .catch(next);
  });

async function checkIfAuthorized(req, res, next) {
  try {
    const campaign = await EncounterService.getCampaignByEncounterId(req.app.get('db'), req.params.encounterid);
    if (campaign.campaignuserid !== req.user.uid) {
      return res.status(401).json({
        error: 'Unauthorized user for requested content'
      });
    }
    next();
  } catch (error) {
    next(error);
  }
}


module.exports = encounterRouter;
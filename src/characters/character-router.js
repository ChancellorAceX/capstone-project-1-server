const express = require('express');
const path = require('path');
const CharacterService = require('./character-service');
const { requireAuth } = require('../middleware/jwt-auth');
const CampaignService = require('../campaigns/campaigns-service');

const characterRouter = express.Router();
const jsonBodyParser = express.json();

characterRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { npc, pcclass, level, pcname, initiative, ac, hp, hpmax, pcencounterid, pccampaignid, pcbestiaryid } = req.body;
    const newCharacter = { npc, pcclass, level, pcname, initiative, ac, hp, hpmax, pcencounterid, pccampaignid, pcbestiaryid };

    const required = npc ? ['npc', 'pcname', 'initiative', 'ac', 'hp', 'hpmax', 'pcencounterid', 'pcbestiaryid'] : ['npc', 'pcclass', 'level', 'pcname', 'ac', 'hp', 'hpmax', 'pccampaignid'];

    const leaveNull = npc ? ['pcclass', 'level', 'pccampaignid'] : ['pcencounterid', 'pcbestiaryid'];

    for (const key of required)
      if (newCharacter[key] == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    for (const key of leaveNull)
      if (newCharacter[key] != (null || undefined))
        return res.status(400).json({
          error: `Current npc setting requires '${key}' to be 'null' or 'undefined'.`
        });
    CharacterService.insertCharacter(req.app.get('db'), newCharacter)
      .then(character => {
        res.status(201).json(CharacterService.serializeCharacter(character));
      })
      .catch(next);
  });

characterRouter
  .route('/:characterid')
  .delete(requireAuth, jsonBodyParser, checkIfAuthorized, (req, res, next) => {
    CharacterService.deleteCharacter(req.app.get('db'), req.params.characterid)
      .then(() => res.status(200).json('Character Deleted'))
      .catch(next);
  })
  .patch(requireAuth, jsonBodyParser, checkIfAuthorized, (req, res, next) => {
    CharacterService.updateCharacter(req.app.get('db'), req.params.characterid, req.body.updateObject)
      .then((data) => { res.status(200).json(data); })
      .catch(next);
  });

async function checkIfAuthorized(req, res, next) {
  try {
    const campaignUserId = await CharacterService.getCampaignUserId(req.app.get('db'), req.params.characterid);
    if (campaignUserId[0].campaignuserid !== req.user.uid) {
      return res.status(401).json({
        error: 'Unauthorized user for requested content/action'
      });
    }
    next();
  } catch (error) { next(error); }
}

module.exports = characterRouter;
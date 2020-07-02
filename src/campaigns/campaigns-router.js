const express = require('express');
const path = require('path');
const CampaignService = require('./campaigns-service');
const { requireAuth } = require('../middleware/jwt-auth');

const campaignRouter = express.Router();
const jsonBodyParser = express.json();

campaignRouter
  .route('/')
  .get(requireAuth,jsonBodyParser,(req,res,next)=>{
    CampaignService.getAllCampaigns(req.app.get('db'),req.user.uid)
      .then(campaigns=>res.json(campaigns))
      .catch(next)
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { title } = req.body;
    const {uid} = req.user;
    const newCampaign = { title, campaignuserid: uid };

    for (const [key, value] of Object.entries(newCampaign))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    CampaignService.insertCampaign(req.app.get('db'), newCampaign)
      .then(campaign => {
        res
          .status(201)
          .json(CampaignService.serializeCampaign(campaign));
      })
      .catch(next);
  });

campaignRouter
  .route('/:campaignid')
  .delete(requireAuth, jsonBodyParser, checkIfAuthorized, (req, res, next) => {
    CampaignService.deleteCampaign(req.app.get('db'), req.params.campaignid)
      .then(() => res.json('Campaign Deleted'))
      .catch(next);
  });

async function checkIfAuthorized(req, res, next) {
  try {
    const campaign = await CampaignService.getCampaignById(req.app.get('db'), req.params.campaignid);
    if (campaign.campaignuserid !== req.user.uid) {
      return res.status(401).json({
        error: 'Unauthorized user for requested content/action'
      });
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = campaignRouter;
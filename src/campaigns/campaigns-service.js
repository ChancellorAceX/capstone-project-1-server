const xss = require('xss');

const CampaignService = {
  getAllCampaigns(db, uid) {
    return db
      .from('campaigns')
      .select()
      .where('campaignuserid', uid);
  },

  getCampaignById(db, id) {
    return db
      .from('campaigns')
      .select()
      .where('cid', id)
      .first();

  },

  insertCampaign(db, newCampaign) {
    return db
      .insert(newCampaign)
      .into('campaigns')
      .returning('*')
      .then(([campaign]) => campaign)
      .then(campaign =>
        CampaignService.getCampaignById(db, campaign.cid)
      );
  },

  serializeCampaign(campaign) {
    return {
      cid: campaign.cid,
      title: xss(campaign.title),
      created: campaign.created,
      campaignuserid: campaign.campaignuserid
    };
  },

  deleteCampaign(db, cid) {
    return db
      .from('campaigns')
      .where('cid', cid)
      .del();
  }
};

module.exports = CampaignService;
const xss = require('xss');
const EncounterService = {
  getAllUserEncounterData(db, userid) {
    return db
      .select('*')
      .from('encounters as e')
      .join('campaigns as c', 'e.encountercampaignid', 'c.cid')
      .where('c.campaignuserid', userid);
  },

  async getDetailedEncounterData(db, eid) {
    const campaignid = await EncounterService.getEncounterCampaignId(db, eid);
    return db
      .from('characters as pc')
      .select('pc.pcid', 'pc.pcname', 'pc.pcclass', 'pc.level', 'pc.initiative', 'pc.ac', 'pc.hp', 'pc.hpmax', 'pc.pcbestiaryid', 'pc.npc', 'pc.pccampaignid', 'pc.pcencounterid')
      .leftJoin('encounters as e', 'pc.pcencounterid', 'e.eid')
      .leftJoin('campaigns as c', function () {
        this.on('e.encountercampaignid', '=', 'c.cid').orOn('pc.pccampaignid', '=', 'c.cid');
      })
      .where('pc.pcencounterid', eid).orWhere('pc.pccampaignid', campaignid[0].encountercampaignid)
      .orderBy('initiative');
  },

  getEncounterCampaignId(db, eid) {
    return db
      .select('encountercampaignid')
      .from('encounters')
      .where('eid', eid);
  },

  getCampaignUserId(db, cid) {
    return db
      .from('campaigns')
      .select('campaignuserid')
      .where('cid', cid);
  },

  deleteEncounter(db, eid) {
    return db
      .from('encounters')
      .where('eid', eid)
      .del();
  },

  getEncounterById(db, id) {
    return db
      .from('encounters')
      .select()
      .where('eid', id)
      .first();
  },

  getCampaignByEncounterId(db, eid) {
    return db
      .select()
      .from('encounters as e')
      .join('campaigns as c', 'c.cid', 'e.encountercampaignid')
      .where('e.eid', eid)
      .first();
  },

  insertEncounter(db, newEncounter) {
    return db
      .insert(newEncounter)
      .into('encounters')
      .returning('*')
      .then(([encounter]) => encounter)
      .then(encounter =>
        EncounterService.getEncounterById(db, encounter.eid)
      );
  },

  serializeEncounter(encounter) {
    return {
      eid: encounter.eid,
      encountername: xss(encounter.encountername),
      encounterdesc: xss(encounter.encounterdesc),
      encountercampaignid: encounter.encountercampaignid
    };
  }
};



module.exports = EncounterService;
//knex.select('*').from('users').leftJoin('accounts', 'users.id', 'accounts.user_id')
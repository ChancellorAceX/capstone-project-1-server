const xss = require('xss');

const CharacterService = {
  getCharacterId(db, id) {
    return db
      .from('characters')
      .select()
      .where('pcid', id)
      .first();
  },

  getCampaignUserId(db, id) {
    return db
      .from('characters as pc')
      .select('c.campaignuserid')
      .leftJoin('encounters as e', 'pc.pcencounterid', 'e.eid')
      .leftJoin('campaigns as c', function () {
        this.on('e.encountercampaignid', '=', 'c.cid').orOn('pc.pccampaignid', '=', 'c.cid');
      })
      .where('pc.pcid', id);
  },

  insertCharacter(db, newCharacter) {
    return db
      .insert(newCharacter)
      .into('characters')
      .returning('*')
      .then(([character]) => character)
      .then(character =>
        CharacterService.getCharacterId(db, character.pcid)
      );
  },

  serializeCharacter(character) {
    return {
      pcid: character.pcid,
      npc: character.npc,
      pcclass: xss(character.pcclass) || null,
      level: character.level || null,
      pcname: xss(character.pcname),
      initiative: character.initiative || null,
      ac: xss(character.ac),
      hp: character.hp,
      hpmax: character.hpmax,
      pcencounterid: character.pcencounterid || null,
      pccampaignid: character.pccampaignid || null,
      pcbestiaryid: character.pcbestiaryid || null
    };
  },

  deleteCharacter(db, pcid) {
    return db
      .from('characters')
      .where('pcid', pcid)
      .del();
  },

  updateCharacter(db,pcid,updateObject){
    const fields = ['pcid','npc','pcclass','level','pcname','initiative','ac','hp','hpmax','pcencounterid','pccampaignid','pcbestiaryid']
    return db
      .from('characters')
      .update(updateObject,fields)
      .where('pcid',pcid);
  }
};

module.exports = CharacterService;
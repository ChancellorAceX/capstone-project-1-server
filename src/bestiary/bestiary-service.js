// const xss = require('xss');
// const Treeize = require('treeize');

const BestiaryService = {
  getAllBeasts(db) {
    console.log('get all beasts')
    return db
      .from('bestiary')
      .select()
      .orderBy('monstername');
  },

  getById(db, bid) {
    return db
      .select()
      .from('bestiary')
      .where('bid', bid)
      .first();
  }

  // serializeBeasts(beasts) {
  //   return beasts.map(this.serializeBeast);
  // },

  // serializeBeast(beast) {
  //   const beastTree = new Treeize();
  //   const beastData = beastTree.grow([beast]).getData()[0];
  //   console.log(beastData)
  //   return {
  //     id: beastData.id,
  //     name: beastData.name,
  //     type: beastData.type,
  //     actions: beastData.actions

  //   };
  // },
};

module.exports = BestiaryService;
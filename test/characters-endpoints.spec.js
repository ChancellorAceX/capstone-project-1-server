const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');
const { expect } = require('chai');



describe('Characters Endpoints', function () {
  let db;
  const {
    testUsers,
    testBestiary,
    testCampaigns,
    testEncounters,
    testCharacters
  } = helpers.makeFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());
  before('cleanup', () => helpers.cleanTables(db));
  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('POST /api/character', () => {
    beforeEach('insert encounters post/character', () =>
      helpers.seedEncounterTables(
        db,
        testUsers,
        testBestiary,
        testCampaigns,
        testEncounters,
        testCharacters
      )
    );

    it('responds with 201 and the created character', () => {
      const newPC = { npc: false, pcclass: 'ShadowDancer', level: 15, pcname: 'Isilduurr', ac: 18, hp: 42, hpmax: 55, pccampaignid: 1 };
      return supertest(app)
        .post('/api/character')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newPC)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('pcid');
          expect(res.body.npc).to.eql(newPC.npc);
          expect(res.body.pcclass).to.eql(newPC.pcclass);
          expect(res.body.level).to.eql(newPC.level);
          expect(res.body.pcname).to.eql(newPC.pcname);
          expect(res.body.ac).to.eql(String(newPC.ac));
          expect(res.body.hp).to.eql(newPC.hp);
          expect(res.body.hpmax).to.eql(newPC.hpmax);
          expect(res.body.pccampaignid).to.eql(newPC.pccampaignid);
        });
    });

    const npcRequired = ['npc', 'pcname', 'initiative', 'ac', 'hp', 'hpmax', 'pcencounterid', 'pcbestiaryid'];

    npcRequired.forEach(key => {
      const newNPC = { npc: true, pcname: 'newMonster', initiative: 4, ac: 10, hp: 6, hpmax: 15, pcencounterid: 1, pcbestiaryid: 3 };
      it(`responds with 400 and 'Missing '${key}' in request body' for npc's when missing`, () => {
        delete newNPC[key];

        return supertest(app)
          .post('/api/character')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(newNPC)
          .expect(400, `{"error":"Missing '${key}' in request body"}`);
      });
    });

    const pcRequired = ['npc', 'pcclass', 'level', 'pcname', 'ac', 'hp', 'hpmax', 'pccampaignid'];

    pcRequired.forEach(key => {
      const newPC = { npc: false, pcclass: 'ShadowDancer', level: 15, pcname: 'Isilduurr', ac: 18, hp: 42, hpmax: 55, pccampaignid: 1 };
      it(`responds with 400 and 'Missing '${key}' in request body' for pc's when missing`, () => {
        delete newPC[key];

        return supertest(app)
          .post('/api/character')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(newPC)
          .expect(400, `{"error":"Missing '${key}' in request body"}`);
      });
    });

    const npcNull = ['pcclass', 'level', 'pccampaignid'];
    npcNull.forEach(key => {
      const newNPC = { npc: true, pcname: 'newMonster', initiative: 4, ac: 10, hp: 6, hpmax: 15, pcencounterid: 1, pcbestiaryid: 3 };
      it(`responds with 400 and "Current npc setting requires '${key}' to be 'null' or 'undefined'."`, () => {
        newNPC[key] = 'value';
        return supertest(app)
          .post('/api/character')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(newNPC)
          .expect(400, `{"error":"Current npc setting requires '${key}' to be 'null' or 'undefined'."}`);
      });
    });

    const pcNull = ['pcencounterid', 'pcbestiaryid'];
    pcNull.forEach(key => {
      const newPC = { npc: false, pcclass: 'ShadowDancer', level: 15, pcname: 'Isilduurr', ac: 18, hp: 42, hpmax: 55, pccampaignid: 1 };
      it(`responds with 400 and "Current npc setting requires '${key}' to be 'null' or 'undefined'."`, () => {
        newPC[key] = 'value';
        return supertest(app)
          .post('/api/character')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(newPC)
          .expect(400, `{"error":"Current npc setting requires '${key}' to be 'null' or 'undefined'."}`);
      });
    });
  });

  describe('DELETE /api/character/:characterid', () => {
    beforeEach('insert encounters post/character', () =>
      helpers.seedEncounterTables(
        db,
        testUsers,
        testBestiary,
        testCampaigns,
        testEncounters,
        testCharacters
      )
    );
    it('responds with 200 and \'Character Deleted\'', () => {
      return supertest(app)
        .delete('/api/character/4')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200, '"Character Deleted"');
    });
    it('removes the character from the array', () => {
      const expect = testCharacters.filter(x => x.pcid !== 3);
      return supertest(app)
        .delete('/api/character/3')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(() => expect === testCharacters);
    });
  });

  describe('PATCH /api/character/:characterid', () => {
    beforeEach('insert encounters post/character', () =>
      helpers.seedEncounterTables(
        db,
        testUsers,
        testBestiary,
        testCampaigns,
        testEncounters,
        testCharacters
      )
    );
    it('responds with 200 and returns the target character new properties', () => {
      const updateObject = { "pcname": 'New Name', "initiative": 30, "ac": 50, "hp": 72, "hpmax": 100 };
      return supertest(app)
        .patch('/api/character/1')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send({ "updateObject": { "pcname": 'New Name', "initiative": 30, "ac": 50, "hp": 72, "hpmax": 100 } })
        .expect(res => {
          expect(res.body[0].pcname).to.eql(updateObject.pcname);
          expect(res.body[0].initiative).to.eql(updateObject.initiative);
          expect(res.body[0].ac).to.eql(updateObject.ac);
          expect(res.body[0].hp).to.eql(updateObject.hp);
          expect(res.body[0].hpmax).to.eql(updateObject.hpmax);
        });
    });
    it('changes the database entry for the target character',()=>{
      const original=testCharacters[0];
      const updateObject = { "pcname": 'New Name', "initiative": 30, "ac": 50, "hp": 72, "hpmax": 100 };

      return supertest(app)
        .patch('/api/character/1')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send({ "updateObject": { "pcname": 'New Name', "initiative": 30, "ac": 50, "hp": 72, "hpmax": 100 } })
        .expect(()=>testCharacters[0]==={...original,...updateObject})
    })
  });
});
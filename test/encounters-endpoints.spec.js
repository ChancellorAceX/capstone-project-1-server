const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');


describe('Encounters Endpoints', function () {
  let db;
  const {
    testUsers,
    testBestiary,
    testCampaigns,
    testEncounters,
    testCharacters
  } = helpers.makeFixtures();

  function makeAuthHeader(user) {
    const token = Buffer.from(`${user.username}:${user.password}`).toString('base64');
    return `Basid ${token}`;
  }

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

  describe('GET /api/encounter', () => {
    context('Given no encounters', () => {
      it('responds with 200 and an empty array', () => {
        helpers.seedUsers(db, testUsers);
        return supertest(app)
          .get('/api/encounter')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, []);
      });
    });
    context('Given encounters in the database', () => {
      beforeEach('insert encounters', () =>
        helpers.seedEncounterTables(
          db,
          testUsers,
          testBestiary,
          testCampaigns,
          testEncounters,
          testCharacters
        )
      );
      it('responds with 200 and all the user\'s encounters and attached campaigns', () => {
        const expectedEncounters = testEncounters.map(encounter =>
          helpers.makeEncounterData(
            encounter,
            testCampaigns
          )
        ).filter(encounter => encounter.campaignuserid === testUsers[0].uid);
        return supertest(app)
          .get('/api/encounter')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200)
          .expect(res => {
            expect(res.body.eid).to.eql(expectedEncounters.eid);
            expect(res.body.campaignuserid).to.eql(expectedEncounters.campaignuserid);
            expect(res.body.cid).to.eql(expectedEncounters.cid);
            expect(res.body.encountercampaignid).to.eql(expectedEncounters.encountercampaignid);
            expect(res.body.encounterdesc).to.eql(expectedEncounters.encounterdesc);
            expect(res.body.encountername).to.eql(expectedEncounters.encountername);
          });
      });
    });
  });

  describe('POST /api/encounter', () => {
    const newEncounter = {
      encountername: 'newEncounter',
      encounterdesc: 'NewEncounterDesc',
      encountercampaignid: 1
    };
    beforeEach('insert encounters 2', () =>
      helpers.seedEncounterTables(
        db,
        testUsers,
        testBestiary,
        testCampaigns,
        testEncounters,
        testCharacters
      )
    );
    it('responds with 201 and the created encounter', () => {
      return supertest(app)
        .post('/api/encounter')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newEncounter)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('eid');
          expect(res.body.encountername).to.eql(newEncounter.encountername);
          expect(res.body.encounterdesc).to.eql(newEncounter.encounterdesc);
          expect(res.body.encountercampaignid).to.eql(newEncounter.encountercampaignid);
        });
    });


    const requiredFields = ['encountername', 'encounterdesc', 'encountercampaignid'];

    requiredFields.forEach(field => {
      const newEncounter = {
        encountername: 'newEncounter',
        encounterdesc: 'NewEncounterDesc',
        encountercampaignid: 1
      };
      it(`responds with 400 and 'Missing '${field}' in request body`, () => {
        delete newEncounter[field];

        return supertest(app)
          .post('/api/encounter')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(newEncounter)
          .expect(400, `{"error":"Missing '${field}' in request body"}`);
      });
    });
  });

  describe('GET /api/encounter/:eid', () => {
    beforeEach('insert encounters 3', () =>
      helpers.seedEncounterTables(
        db,
        testUsers,
        testBestiary,
        testCampaigns,
        testEncounters,
        testCharacters
      )
    );

    const expected = [...testCharacters.slice(3).concat(testCharacters.slice(0, 3))];
    it('responds with 200 and all the characters for the encounter', () => {
      return supertest(app)
        .get('/api/encounter/1')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200, expected);
    });
  });

  describe('DELETE /api/encounter/:eid', () => {
    beforeEach('insert encounters 4', () =>
      helpers.seedEncounterTables(
        db,
        testUsers,
        testBestiary,
        testCampaigns,
        testEncounters,
        testCharacters
      )
    );
    it('responds with 200 and \'Encounter Deleted\'', () => {
      return supertest(app)
        .delete('/api/encounter/1')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200, '"Encounter Deleted"');
    });
  });
});




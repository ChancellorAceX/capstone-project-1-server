const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');
const { expect } = require('chai');



describe('Campaigns Endpoints', function () {
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

  describe('GET /api/campaign', () => {
    it('responds with 200 and all of the user\'s campaigns', () => {
      return supertest(app)
        .get('/api/campaign')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(res => res.body === testCampaigns.filter(c => c.campaignuserid === 1));
    });
  });

  describe('POST /api/campaign', () => {
    it('responds with 201 and the new campaign information', () => {
      return supertest(app)
        .post('/api/campaign')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send({ title: 'New Campaign' })
        .expect(201)
        .expect(res => {
          expect(res.body.title).to.eql('New Campaign');
          expect(res.body).to.have.property('cid');
          expect(res.body).to.have.property('campaignuserid');
        });
    });
    it('responds with 400 and "{"error":"Missing \'title\' in request body"}" if title is missing', () => {
      return supertest(app)
        .post('/api/campaign')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send({ wrong: 'object' })
        .expect(400, '{"error":"Missing \'title\' in request body"}');
    });
  });

  describe('DELETE /api/campaign/:campaignid', () => {
    it('responds with 200 and "Campaign Deleted"', () => {
      return supertest(app)
        .delete('/api/campaign/1')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200, '"Campaign Deleted"');
    });
  });
});
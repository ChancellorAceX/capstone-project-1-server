const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');
const { expect } = require('chai');



describe('Bestiary Endpoints', function () {
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

  describe('GET /api/bestiary', () => {
    it('responds 200 and pulls all monsters', () => {
      return supertest(app)
        .get('/api/bestiary')
        .expect(res => {
          expect(res.body).to.eql(testBestiary);
        });
    });
  });

  describe('GET /api/bestiary/:bid', () => {
    it('responds 200 and the data for a specific monster', () => {
      return supertest(app)
        .get('/api/bestiary/1')
        .expect(res => {
          expect(res.body).to.eql(testBestiary[0]);
        });
    });
  });

});
const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');
const { expect } = require('chai');

describe('Users Endpoints', function () {
  let db;
  const {
    testUsers,
    testBestiary,
    testCampaigns,
    testEncounters,
    testCharacters
  } = helpers.makeEncounterArray();

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

  describe('POST /api/user', () => {
    it('creates a new user, responding with 201 and the new user', function () {
      const newUser = {
        username: 'testName',
        password: 'Password1!',
        fullname: 'Test Name',
        nickname: 'TNnickname'
      };
      return supertest(app)
        .post('/api/user')
        .send(newUser)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('uid');
          expect(res.body.username).to.eql(newUser.username);
          expect(res.body.fullname).to.eql(newUser.fullname);
          expect(res.body.nickname).to.eql(newUser.nickname);
          expect(res.body).to.have.property('creation');
        });
    });
  });
});
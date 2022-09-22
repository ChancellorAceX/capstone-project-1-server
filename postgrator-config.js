require('dotenv').config();

module.exports = {
  'migrationDirectory': 'migrations',
  'driver': 'pg',
  'connectionString':'postgres://postgres:887b0400eb581ed15259e54a2fd43f411f317e9f796ae5ab@battlesource-db.internal:5432/dnd5ebestiary',
  // 'connectionString': process.env.NODE_ENV === 'test'
  //   ? process.env.TEST_DATABASE_URL
  //   : process.env.DATABASE_URL,
  'ssl': !!process.env.SSL
};

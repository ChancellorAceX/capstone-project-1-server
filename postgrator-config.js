require('dotenv').config('C:\Users\bitcl\Thinkful-EI-Repos\Capstone\1-server\.env');
console.log(process.env.NODE_ENV)
module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "connectionString": process.env.NODE_ENV === 'test'
    ? process.env.TEST_DB_URL
    : process.env.DB_URL
};

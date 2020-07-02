module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.NODE_ENV==='test' ? process.env.TEST_DB_URL : (process.env.DB_URL || 'postgresql://postgres@localhost/dnd5ebestiary'),
  JWT_SECRET: process.env.JWT_SECRET || '$2a$12$UvCBInXU6NvoutreUOxzKOl7.IPYQFqZR7i0cQY5xws0A3KkYZKSu'
};
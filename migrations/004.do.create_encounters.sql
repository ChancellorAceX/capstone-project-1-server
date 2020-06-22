CREATE TABLE encounters (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT NULL,
  campaignid INTEGER
    REFERENCES campaigns(id) ON DELETE CASCADE NOT NULL
);
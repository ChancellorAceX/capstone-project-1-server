CREATE TABLE campaigns (
  cid SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  campaignuserid INTEGER
    REFERENCES users(uid) ON DELETE CASCADE NOT NULL
);
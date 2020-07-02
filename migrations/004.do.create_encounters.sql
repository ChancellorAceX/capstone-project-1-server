CREATE TABLE encounters (
  eid SERIAL PRIMARY KEY,
  encountername TEXT NOT NULL,
  encounterdesc TEXT DEFAULT NULL,
  encountercampaignid INTEGER
    REFERENCES campaigns(cid) ON DELETE CASCADE NOT NULL
);
CREATE TABLE characters (
  pcid SERIAL PRIMARY KEY,
  npc BOOLEAN NOT NULL,
  pcclass TEXT,
  level INTEGER,
  pcname TEXT NOT NULL,
  initiative INTEGER,
  ac INTEGER NOT NULL,
  hp INTEGER DEFAULT 0,
  hpmax INTEGER NOT NULL,
  -- reference to encounter (monsters only)
  pcencounterid INTEGER
    REFERENCES encounters(eid) ON DELETE CASCADE,
  -- reference to campaign (for players only)
  pccampaignid INTEGER
    REFERENCES campaigns(cid) ON DELETE CASCADE,
  -- reference to bestiary (for monsters only)
  pcbestiaryid INTEGER
    REFERENCES bestiary(bid) ON DELETE CASCADE
);
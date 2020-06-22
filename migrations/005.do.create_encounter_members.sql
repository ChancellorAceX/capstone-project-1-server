CREATE TABLE encounter_members (
  id SERIAL PRIMARY KEY,
  npc BOOLEAN NOT NULL,
  name TEXT NOT NULL,
  initiative INTEGER,
  ac INTEGER NOT NULL,
  hp INTEGER,
  hpmax INTEGER NOT NULL,
  encounterid INTEGER
    REFERENCES encounters(id) ON DELETE CASCADE NOT NULL,
  -- reference to campaign (for players only)
  campaignid INTEGER
    REFERENCES campaigns(id) ON DELETE CASCADE,
  -- reference to bestiary (for monsters only)
  bestiaryid INTEGER
    REFERENCES bestiary(id) ON DELETE CASCADE
);
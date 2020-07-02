CREATE TABLE bestiary (
  bid SERIAL PRIMARY KEY,
  monstername TEXT NOT NULL,
  type TEXT NOT NULL,
  ac TEXT NOT NULL,
  maxhp TEXT NOT NULL,
  speed INTEGER NOT NULL,
  burrowspeed INTEGER DEFAULT NULL,
  climbspeed INTEGER DEFAULT NULL,
  flyspeed INTEGER DEFAULT NULL,
  swimspeed INTEGER DEFAULT NULL,
  str INTEGER NOT NULL,
  strmod INTEGER NOT NULL,
  dex INTEGER NOT NULL,
  dexmod INTEGER NOT NULL,
  con INTEGER NOT NULL,
  conmod INTEGER NOT NULL,
  int INTEGER NOT NULL,
  intmod INTEGER NOT NULL,
  wis INTEGER NOT NULL,
  wismod INTEGER NOT NULL,
  cha INTEGER NOT NULL,
  chamod INTEGER NOT NULL,
  savingthrows TEXT DEFAULT NULL,
  skills TEXT DEFAULT NULL,
  vulnerabilities TEXT DEFAULT NULL,
  resistances TEXT DEFAULT NULL,
  immunities TEXT DEFAULT NULL,
  senses TEXT DEFAULT NULL,
  languages TEXT DEFAULT NULL,
  cr REAL NOT NULL,
  xp INTEGER NOT NULL,
  extras TEXT ARRAY DEFAULT NULL,
  actions TEXT ARRAY NOT NULL
);
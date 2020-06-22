CREATE TABLE bestiary (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  ac TEXT NOT NULL,
  maxhp TEXT NOT NULL,
  speed TEXT NOT NULL,
  burrowspeed TEXT DEFAULT NULL,
  climbspeed TEXT DEFAULT NULL,
  flyspeed TEXT DEFAULT NULL,
  swimspeed TEXT DEFAULT NULL,
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
  savingthrows TEXT NOT NULL,
  skills TEXT NOT NULL,
  vulnerabilities TEXT NOT NULL,
  resistances TEXT NOT NULL,
  immunitites TEXT NOT NULL,
  senses TEXT NOT NULL,
  languages TEXT NOT NULL,
  cr INTEGER NOT NULL,
  xp INTEGER NOT NULL,
  extras TEXT DEFAULT NULL,
  actions TEXT NOT NULL
);
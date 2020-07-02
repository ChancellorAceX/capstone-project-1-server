CREATE TABLE users (
  uid SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  fullname TEXT NOT NULL,
  password TEXT NOT NULL,
  nickname TEXT,
  creation TIMESTAMPTZ NOT NULL DEFAULT now()
);
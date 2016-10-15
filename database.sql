CREATE DATABASE todoapp;

CREATE TABLE tasklist (
  id SERIAL PRIMARY KEY,
  task varchar(80) NOT NULL,
  discription varchar(80) NOT NULL,
  complete boolean NOT NULL
);

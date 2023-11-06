const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians
app.get("/musicians", async (req, res) => {
  const findMusician = await Musician.findAll();
  res.json(findMusician);
});

app.get("/musicians/1", async (req, res) => {
  const findMusician = await Musician.findOne({ where: { id: 1 } });
  res.json(findMusician);
});

app.get("/musicians/2", async (req, res) => {
  const findMusician = await Musician.findOne({ where: { id: 2 } });
  res.json(findMusician);
});

app.get("/musicians/3", async (req, res) => {
  const findMusician = await Musician.findOne({ where: { id: 3 } });
  res.json(findMusician);
});

app.get("/bands", async (req, res) => {
  const findBand = await Band.findAll();
  res.json(findBand);
});

module.exports = app;

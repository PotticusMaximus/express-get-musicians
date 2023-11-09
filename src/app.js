const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index");
const musicianRouter = require("../routes/router");

app.set("json spaces", 2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/musicians", musicianRouter);
// app.get("/", (req, res) => {
//   //console.log("hi");
//   res.send(200);
// });

//TODO: Create a GET /musicians route to return all musicians
// app.get("/musicians", async (req, res) => {
//   const findMusician = await Musician.findAll();
//   res.json(findMusician);
// });

// app.get("/musicians/1", async (req, res) => {
//   const findMusician = await Musician.findOne({ where: { id: 1 } });
//   res.json(findMusician);
// });

// app.get("/musicians/2", async (req, res) => {
//   const findMusician = await Musician.findOne({ where: { id: 2 } });
//   res.json(findMusician);
// });

// app.get("/musicians/3", async (req, res) => {
//   const findMusician = await Musician.findOne({ where: { id: 3 } });
//   res.json(findMusician);
// });

// app.get("/musicians/:id", async (req, res) => {
//   const musicianId = req.params.id;
//   const findMusician = await Musician.findByPk({ where: { id: musicianId } });
//   res.json(findMusician);
// });

app.get("/bands", async (req, res) => {
  const findBand = await Band.findAll();
  res.json(findBand);
});

// app.post("/musicians", async (req, res) => {
//   const data = await Musician.create(req.body);
//   res.json(data);
// });

// app.put("/musicians/:id", async (req, res) => {
//   const musicianId = req.params.id;
//   const findMusician = await Musician.update(req.body, {
//     where: { id: musicianId },
//   });
//   res.json(findMusician);
// });

// app.delete("/musicians/:id", async (req, res) => {
//   const musicianId = req.params.id;
//   const findMusician = await Musician.destroy({ where: { id: musicianId } });
//   res.json(findMusician);
// });

module.exports = app;

const { Router } = require("express");
const { Musician } = require("../models");
const { check, validationResult } = require("express-validator");
//
const musicianRouter = Router();
musicianRouter.get("/", async (req, res) => {
  try {
    const result = await Musician.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: "Error ocurred during GET request" });
  }
});

musicianRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Musician.findByPk(id);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: "Error ocurred during GET ID request" });
  }
});

musicianRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const update = await Musician.update(req.body, {
      where: { id: id },
    });
    const result = await Musician.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: "Error ocurred during PUT request" });
  }
});

musicianRouter.post(
  "/",
  [
    check("name").not().isEmpty().trim(),
    check("instrument").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      try {
        const update = await Musician.create(req.body);
        const result = await Musician.findAll();
        res.json(result);
      } catch (error) {
        res.status(500).send({ error: "Error ocurred during POST request" });
      }
    }
  }
);

musicianRouter.delete("/:id", async (req, res) => {
  try {
    const result = await Musician.destroy({ where: { id: req.params.id } });
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: "Error ocurred during DELETE request" });
  }
});

module.exports = musicianRouter;

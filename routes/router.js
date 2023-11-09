const { Router } = require("express");
const { Musician } = require("../models");
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

musicianRouter.post("/", async (req, res) => {
  try {
    const update = await Musician.create(req.body);
    const result = await Musician.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: "Error ocurred during POST request" });
  }
});

musicianRouter.delete("/:id", async (req, res) => {
  try {
    const result = await Musician.destroy({ where: { id: req.params.id } });
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: "Error ocurred during DELETE request" });
  }
});

module.exports = musicianRouter;

// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const seedMusician = require("./seedData");

test("Musicians endpoint", async () => {
  // Sends request to `/bakedGoods` endpoint
  const response = await request(app).get("/musicians");
  expect(response.statusCode).toBe(200);
});

test("Testing musicians json data", async () => {
  // Sends request to `/bakedGoods` endpoint
  const response = await request(app).get("/musicians");
  const responseData = JSON.parse(response.text);
  expect(responseData[0].name).toEqual("Mick Jagger");
  expect(responseData[1].name).toEqual("Drake");
  expect(responseData[2].name).toEqual("Jimi Hendrix");
});

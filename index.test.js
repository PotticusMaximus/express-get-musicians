const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");
const syncSeed = require("./seed");

const request = require("supertest");
const app = require("./src/app");
const musicianRouter = require("./routes/router");
app.use("/musicians", musicianRouter);

beforeEach(async () => {
  await syncSeed();
});

test("Musicians endpoint", async () => {
  const response = await request(app).get("/musicians");
  expect(response.statusCode).toBe(200);
});

test("Testing musicians routing", async () => {
  const response = await request(app).get("/musicians");
  const responseData = JSON.parse(response.text);
  expect(responseData[0].name).toEqual("Mick Jagger");
  expect(responseData[1].name).toEqual("Drake");
  expect(responseData[2].name).toEqual("Jimi Hendrix");
});

test("Testing musicians id endpoint", async () => {
  const response = await request(app).get("/musicians/2");
  const responseData = JSON.parse(response.text);
  expect(responseData.name).toEqual("Drake");
});

test("Testing musicians create function", async () => {
  const response = await request(app).post("/musicians").send({
    name: "Fancy Pants",
    instrument: "Harp",
  });
  const data = await request(app).get("/musicians");
  expect(data.body[3].instrument).toEqual("Harp");
});
//
test("Testing musicians delete function", async () => {
  const response = await request(app).delete("/musicians/1");
  const data = await request(app).get("/musicians");
  expect(data.body[0].name).toEqual("Drake");
});
test("Testing musicians update function", async () => {
  const response = await request(app).put("/musicians/1").send({
    name: "Fancy Pants",
    instrument: "Harp",
  });
  expect(response.statusCode).toEqual(200);
});

test("Bands endpoint", async () => {
  const response = await request(app).get("/bands");
  expect(response.statusCode).toBe(200);
});

test("Testing bands json data", async () => {
  const response = await request(app).get("/bands");
  const responseData = JSON.parse(response.text);
  expect(responseData[0].name).toEqual("The Beatles");
  expect(responseData[1].name).toEqual("Black Pink");
  expect(responseData[2].name).toEqual("Coldplay");
});
//
test("POST req throws error if fields are empty", async () => {
  const postNew = await request(app)
    .post("/musicians")
    .send({ name: "", instrument: "hi" });
  //console.log(postNew.body);
  expect(postNew.body.error[0].msg).toBe("Invalid value");
});

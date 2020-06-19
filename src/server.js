const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const db = require("./mysql");

const NODE_PORT = process.env.NODE_PORT || 9000;
const app = express();

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CRUD - Create, Read, Update, Delete

// Create
app.post("/states", async (req, res) => {
  // create state record

  const stateUuid = uuid.v4();

  const newState = {
    uuid: stateUuid,
    name: req.body.name,
    abbreviation: req.body.abbreviation,
    capital: req.body.capital,
    population: req.body.population,
    country: req.body.country,
  };

  // Insert record into DB
  await db.query("INSERT INTO State SET ?", [newState]);

  return res.status(201).json(newState);
});

// Read

app.get("/states", async (req, res) => {
  // get list of all states

  const stateList = await db.query("SELECT * FROM State WHERE valid=1");

  return res.json({ results: stateList });
});

app.get("/states/:stateUuid", async (req, res) => {
  // get the state identified by 'stateUuid'

  const { stateUuid } = req.params;

  const stateList = await db.query(
    "SELECT * FROM State WHERE uuid=? AND valid=1",
    [stateUuid]
  );

  if (!stateList.length) {
    return res.status(404).json({ statusCode: 404, message: "Not Found" });
  }

  const state = stateList[0];

  return res.json(state);
});

// Update

app.patch("/states/:stateUuid", async (req, res) => {
  // update the state identified by 'stateUuid'

  const { stateUuid } = req.params;

  const stateList = await db.query(
    "SELECT * FROM State WHERE uuid=? AND valid=1",
    [stateUuid]
  );

  if (!stateList.length) {
    return res.status(404).json({ statusCode: 404, message: "Not Found" });
  }

  const state = stateList[0];

  const updatedState = { ...state, ...req.body, uuid: state.uuid };

  await db.query("UPDATE State SET ? WHERE uuid=?", [updatedState, stateUuid]);

  return res.json(updatedState);
});

// Delete

app.delete("/states", async (req, res) => {
  // delete all states

  await db.query("UPDATE State SET valid=0");

  return res.status(204).end();
});

app.delete("/states/:stateUuid", async (req, res) => {
  // delete the state identified by 'stateUuid'

  const { stateUuid } = req.params;

  const stateList = await db.query(
    "SELECT * FROM State WHERE uuid=? AND valid=1",
    [stateUuid]
  );

  if (!stateList.length) {
    return res.status(404).json({ statusCode: 404, message: "Not Found" });
  }

  await db.query("UPDATE State SET valid=0 WHERE uuid=?", [stateUuid]);

  return res.status(204).end();
});

app.use((req, res) => {
  return res.status(404).json({ statusCode: 404, message: "Not Found" });
});

app.listen(NODE_PORT, () => {
  console.log(`starting server on port ${NODE_PORT}`);
});

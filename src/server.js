const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const NODE_PORT = process.env.NODE_PORT || 9000;
const app = express();

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CRUD - Create, Read, Update, Delete

const stateDictionary = {};

// Create
app.post("/states", (req, res) => {
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

  stateDictionary[newState.uuid] = newState;
  return res.status(201).json(newState);
});

// Read

app.get("/states", (req, res) => {
  // get list of all states

  const stateList = Object.keys(stateDictionary).map(
    (key) => stateDictionary[key]
  );

  return res.json({ results: stateList });
});

app.get("/states/:stateUuid", (req, res) => {
  // get the state identified by 'stateUuid'

  const { stateUuid } = req.params;

  const state = stateDictionary[stateUuid];

  if (!state) {
    return res.status(404).json({ statusCode: 404, message: "Not Found" });
  }

  return res.json(state);
});

// Update

app.patch("/states/:stateUuid", (req, res) => {
  // update the state identified by 'stateUuid'

  const { stateUuid } = req.params;

  const state = stateDictionary[stateUuid];

  if (!state) {
    return res.status(404).json({ statusCode: 404, message: "Not Found" });
  }

  const updatedState = { ...state, ...req.body, uuid: state.uuid };

  stateDictionary[stateUuid] = updatedState;

  return res.json(updatedState);
});

// Delete

app.delete("/states", (req, res) => {
  // delete all states

  Object.keys(stateDictionary).map((key) => {
    delete stateDictionary[key];
  });

  return res.status(204).end();
});

app.delete("/states/:stateUuid", (req, res) => {
  // delete the state identified by 'stateUuid'

  const { stateUuid } = req.params;

  const state = stateDictionary[stateUuid];

  if (!state) {
    return res.status(404).json({ statusCode: 404, message: "Not Found" });
  }

  delete stateDictionary[stateUuid];

  return res.status(204).end();
});

app.use((req, res) => {
  return res.status(404).json({ statusCode: 404, message: "Not Found" });
});

app.listen(NODE_PORT, () => {
  console.log(`starting server on port ${NODE_PORT}`);
});

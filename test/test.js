const { expect } = require("chai");
const superagent = require("superagent");

const PORT = process.env.PORT || 9000;

const baseUrl = `http://localhost:${PORT}`;

describe("State Routes", () => {
  let stateUuid;

  it("should delete all states", async () => {
    const res = await superagent.delete(`${baseUrl}/states`);

    expect(res.status).to.equal(204);
  });

  it("should create a state", async () => {
    const reqBody = {
      name: "Ohio",
      abbreviation: "OH",
      capital: "Columbus",
      population: 11689100,
      country: "US",
    };

    const res = await superagent.post(`${baseUrl}/states`).send(reqBody);

    expect(res.status).to.equal(201);
    expect(res.body).to.haveOwnProperty("uuid");
    expect(res.body).to.haveOwnProperty("name");
    expect(res.body.name).to.equal(reqBody.name);
    stateUuid = res.body.uuid;
  });

  it("should get a list of states", async () => {
    const res = await superagent.get(`${baseUrl}/states`);

    expect(res.status).to.equal(200);
    expect(res.body).to.haveOwnProperty("results");
    expect(res.body.results.length).to.equal(1);
  });

  it("get a state", async () => {
    const res = await superagent.get(`${baseUrl}/states/${stateUuid}`);

    expect(res.body).to.haveOwnProperty("uuid");
    expect(res.body.uuid).to.equal(stateUuid);
  });

  it("should update a state", async () => {
    const reqBody = {
      country: "USA",
    };

    const res = await superagent
      .patch(`${baseUrl}/states/${stateUuid}`)
      .send(reqBody);

    expect(res.body).to.haveOwnProperty("uuid");
    expect(res.body.uuid).to.equal(stateUuid);
    expect(res.body).to.haveOwnProperty("country");
    expect(res.body.country).to.equal(reqBody.country);
  });

  it("should delete a state", async () => {
    let res;

    // delete state
    res = await superagent.delete(`${baseUrl}/states/${stateUuid}`);
    expect(res.status).to.equal(204);

    // verify state has been deleted
    try {
      await superagent.get(`${baseUrl}/states/${stateUuid}`);
    } catch (error) {
      expect(error).to.haveOwnProperty("status");
      expect(error.status).to.equal(404);
    }
  });
});

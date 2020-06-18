const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res) => {
  res.status(404).json({ statusCode: 404, message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`starting server on port ${PORT}`);
});

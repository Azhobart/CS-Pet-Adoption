const cors = require("cors");
const express = require("express");
const model = require("./model");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));

// set up a GET endpoint
app.get("/pets", async (request, response) => {
  try {
    let trails = await model.pets.find();
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.json(trails);
  } catch (error) {
    console.log(error);
    response.status(400).send("Generic Error");
  }
});

app.get("/pets/:id", async (request, response) => {
  try {
    let getPet = await model.pets.findOne({ _id: request.params.id });
    console.log(getPet);
    if (!getPet) {
      response.status(404).send("Pet has not been found.");
      return;
    }

    response.json(getPet);
  } catch (error) {
    console.log(error);
    response.status(400).send("Generic Error");
  }
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});

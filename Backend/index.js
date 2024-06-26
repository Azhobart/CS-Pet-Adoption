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

app.post("/pets", (req, res) => {
  let data = req.body;
  try {
    let new_pet = new model.pets({
      name: data.name,
      species: data.species,
      breed: data.breed,
      age: data.age,
      gender: data.gender,
    });

    let error = new_pet.validateSync();
    if (error) {
      res.status(404).json(error);
      return;
    }

    new_pet.save();
    res.status(201).json(new_pet);
  } catch (error) {
    res.status(error).send("Something failed when making a pet.");
  }
});

app.delete("/pets/:id", async (req, res) => {
  try {
    let is_deleted = await model.pets.findOneAndDelete({
      _id: req.params.id,
    });
    if (!is_deleted) {
      res.status(404).send("Could not find a pet with that id.");
      return;
    }

    res.status(204).send("Succesful deletion.");
  } catch (error) {
    res.status(404).send("Delete failure.");
  }
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});

const mongoose = require("mongoose");

mongoose.connect(process.env.DBPASSWORD);

const PetSchema = new mongoose.Schema({
  name: String,
  species: String,
  breed: String,
  age: Number,
  gender: String,
});

const AppSchema = new mongoose.Schema({
  name: String,
  phone_number: Number,
  email: String,
  pet_id: Number,
});

const pets = mongoose.model("Pets", PetSchema);
const applications = mongoose.model("Applications", AppSchema);

module.exports = {
  pets: pets,
  applications: applications,
};

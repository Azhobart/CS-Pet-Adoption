const mongoose = require("mongoose");

mongoose.connect(process.env.DBPASSWORD);

const PetSchema = new mongoose.Schema({
  name: String,
});

const pets = mongoose.model("Pets", PetSchema);

module.exports = {
  pets: pets,
};

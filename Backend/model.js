const mongoose = require("mongoose");

mongoose.connect(process.env.DBPASSWORD);

const TrailSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Trail needs to have a name."]
        },

        distance: {
            type: Number,
            required: [true, "Trail needs to have a distance."]
        },

        difficulty: {
            type: Number,
            required: [true, "Trail needs to have a difficulty level"]
        }
    }

);

const mtbTrails = mongoose.model("mtbTrails", TrailSchema);

module.exports = {
    mtbTrails: mtbTrails,
}



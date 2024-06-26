const cors = require("cors");
const express = require("express");
const model = require('./model');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));


// set up a GET endpoint
app.get("/mtbtrails", async (request, response) => {
    try {
        let trails = await model.mtbTrails.find();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.json(trails);

    } catch (error) {
        console.log(error);
        response.status(400).send("Generic Error");
    };
});

// Set up a POST endpoint
app.post("/mtbtrails",  async (request, response) => {
    const data = request.body;
    try {
        // create a new MongomtbTrails using our model
        let newMtbTrails = new model.mtbTrails({
            name: data.name,
            distance: data.distance,
            difficulty: data.difficulty,
            
        });

        let error = newMtbTrails.validateSync();
        if (error) {
            response.status(400).json(error);
            return;
        };

        await newMtbTrails.save();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.status(201).json(newMtbTrails);

    } catch (error) {
        console.log(error);
        response.status(400).send("Generic Error");
    };

});

app.delete("/mtbtrails/:id", async (request, response) => {
    try {
        let isDeleted = await model.mtbTrails.findOneAndDelete({ _id: request.params.id });

        // if is deleted
        if (!isDeleted) {
            response.status(404).send("Could not find trail");
            return;
        };

        response.status(200).send("Mountain Bike Trail Deleted");

    } catch (error) {
        console.log(error);
        response.status(400).send("Generic Error");
    };


});

app.get("/mtbtrails/:id", async (request, response) => {
    
    try {
        let getMtbTrail = await model.mtbTrails.findOne({_id: request.params.id});
        console.log(getMtbTrail);
        if (!getMtbTrail) {
            response.status(404).send("Mountain Bike Trail has not been found.");
            return;
        };

        response.json(getMtbTrail);
            

    } catch (error) {
        console.log(error);
        response.status(400).send("Generic Error");
    };

});

app.put("/mtbtrails/:id", async (request, response) => {

    try {
        const updatedMtbTrail = {
            name: request.body.name,
            distance: request.body.distance,
            difficulty: request.body.difficulty,
        };
    
        let putMtbTrail = await model.mtbTrails.findByIdAndUpdate({_id: request.params.id}, updatedMtbTrail, {new: true,},);

        if (!putMtbTrail) {
            response.status(404).send("Mountain Bike Trail does not exist");
            return;
        };

        response.status(204).json(putMtbTrail);
        

    } catch (error) {
        console.log(error);
        response.status(400).send("Generic Error");
    };

   
});




app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});


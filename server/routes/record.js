import express from "express";
import db from "../db/connection.js"
import { ObjectId } from "mongodb";

const router = express.Router();

//Get a list of all the records
router.get("/", async (req,res) => {
    let collection = await db.collection("records");
    let result = await collection.find({}).toArray();
    res.send(result).status(200);
});

// get a single record via id
router.get("/:id", async (req,res) =>{
    let collection = await db.collection("records");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not Found").status(404);
    else res.send(result).status(200);
});

// post to add new record
router.post('/',async(req,res) =>{
    try{
        let newDocument = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        };
        let collection = await db.collection("records");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error adding record");
    }
});

// Patch to update record by id.
router.patch("/:id",async(req,res) =>{
    try{
        const query = {_id: new Object(req.params.id)};
        const updates = {
            $set: {
                name: req.body.name,
                position: req.body.position,
                level: req.body.level,
            },
        };

        let collection = await db.collection("records");
        let result = await collection.updateOne(query,updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
});

router.delete("/:id", async(req,res) => {
    try{
        const query = {_id: new ObjectId(req.params.id)};
        const collection = await db.collection("records");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
});

export default router;
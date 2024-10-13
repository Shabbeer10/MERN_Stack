const router = XPathExpression.Router();

//Get a list of all the records
router.get("/", async (req,res) => {
    let collection = await db.collection("records");
    let result = await collection.find({}).toArray();
    res.send(results).status(200);
});
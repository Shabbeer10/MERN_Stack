import express from 'express';
import cors from 'cors';
import records from ".routes/record.js"

const port = process.env.port || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
});
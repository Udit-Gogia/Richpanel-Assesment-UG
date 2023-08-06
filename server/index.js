const express = require("express")
require("./db/mongoConn")
require("dotenv").config()
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/"
const auth = require("./middleware/auth")


const app = express();
const port = process.env.PORT || 8000;

app.use(express.json())

const mongoURI = process.env.MONGODB_URL;


const userRouter = require("./routers/userRouter");
app.use(userRouter);

app.get("/plans", auth, async (req, res) => {
    try {
        const client = new MongoClient(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await client.connect();

        const db = client.db();

        const plansCollection = db.collection("plans");

        const plans = await plansCollection.find({}).toArray();

        res.status(200).json(plans);

        client.close();

    } catch (e) {
        res.status(500).send({ length: 0, msg: " Error while collecting data from db", code: "noPlans" });
    }
})


app.listen(port, () => {
    console.log("listening on port ", port);
})
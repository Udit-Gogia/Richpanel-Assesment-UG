const express = require("express")
require("./db/mongoConn")
require("dotenv").config()


const app = express();
const port = process.env.PORT || 8000;

app.use(express.json())

const userRouter = require("./routers/userRouter");
app.use(userRouter);


app.listen(port, () => {
    console.log("listening on port ", port);
})
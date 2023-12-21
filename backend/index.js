require("dotenv").config();
const express = require("express"); const app = express();
const mysql = require("mysql");

const {AuthRouter} = require("./routes/authRoute");

const conn = require("./db/connectionConstant");
const userController = require("./db/controllers/userController");

app.use(require("cors")());
app.use(express.json());
app.use("/api/auth", AuthRouter);

app.get("/", (req, res) => {
    userController.query(conn).then(data => res.json(data));
});

app.listen(3001, () => console.log("Server is on"));
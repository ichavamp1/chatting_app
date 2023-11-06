require("dotenv").config();
const express = require("express"); const app = express();
const mysql = require("mysql");
const baseController = require("./db/controllers/baseController");

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

conn.connect(error => {
    if (error) throw error;
});

app.get("/", (req, res) => {
    baseController.queryTable(conn, "test", "*").then(data => res.json(data));
})

app.listen(3000, () => console.log("Server is on"));
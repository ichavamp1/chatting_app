const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const conn = require("../db/connectionConstant");

const AuthRouter = express.Router();
const userController = require("../db/controllers/userController");

if (conn.state === "disconnected") conn.connect(error => {
    if (error) throw error;
})

AuthRouter.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({message: "Invalid request body"});

    if ((await userController.select(conn, "*", null, `WHERE username = '${username}'`)).length > 0) return res.status(500).json({message: "User already exists"});

    bcrypt.hash(password, 10, (error, hash) => {
        userController.insert(conn, [username, hash]).then(data => res.status(200).json({message: "User successfully registred", userId: data.insertId})).catch(dbError => res.status(500).json({message: [error, dbError]}));
    });
});

AuthRouter.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({message: "Invalid request body"});

});

module.exports = AuthRouter;
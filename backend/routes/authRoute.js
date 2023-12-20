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

AuthRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({message: "Invalid request body"});

    const targetUser = (await userController.select(conn, "*", null, `WHERE username = '${username}'`))[0];

    if (targetUser == null) return res.status(404).json({message: "User not found"});

    if ((await bcrypt.compare(password, targetUser.password)) == false) return res.status(401).json({message: "Incorrect password"});

    const accessToken = jwt.sign({userId: targetUser.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "6h"});

    return res.status(200).json({accessToken: accessToken, userId: targetUser.id, username: targetUser.username});
});

function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(400).json({message: "No token provided"});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
        if (error) return res.status(500);
        req.user = payload;
        next();
    });
}

module.exports = {AuthRouter, authenticateToken};
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const conn = require("../db/connectionConstant");

const AuthRouter = express.Router();
const userController = require("../db/controllers/userController");

if (conn.state === "disconnected") conn.connect(error => {
    if (error) throw error;
})

AuthRouter.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({message: "Invalid request body"});
        return;
    }
    const usersList = userController.query()
});

module.exports = AuthRouter;
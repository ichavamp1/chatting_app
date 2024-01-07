const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const conn = require("../db/connectionConstant");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "pictures/");
    },
    filename: function (req, file, cb) {
        const suffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const fileMime = file.mimetype.split("/")[1];
        cb(null, `${file.originalname}-${suffix}.${fileMime}`);
    },
});
  
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        const mimeType = file.mimetype.split("/")[0]; //e.g text/plain -> will get text | image/png -> will get image
        mimeType === "image" ? cb(null, true) : cb(null, false);
    }
});

const AuthRouter = express.Router();
const userController = require("../db/controllers/userController");
const invalid_tokensController = require("../db/controllers/invalid_tokenController");

AuthRouter.post("/register", upload.single("pfp"), async (req, res) => {
    const fileName = req.file?.filename ?? "default.png";
    const { username, password } = req.body;
    if (!username || !password){
        fs.unlink(`pictures/${fileName}`, (err) => console.log(err));
        return res.status(400).json({message: "Invalid request body"});
    }
    if (!req.file) return res.status(400).json({message: "Invalid file type"});

    if ((await userController.select(conn, "*", null, `WHERE username = '${username}'`)).length > 0){
        fs.unlink(`pictures/${fileName}`, (err) => console.log(err));
        return res.status(500).json({message: "User already exists"});
    }

    bcrypt.hash(password, 8, (error, hash) => {
        userController.insert(conn, [username, hash, fileName]).then(data => res.status(200).json({message: "User successfully registred", userId: data.insertId})).catch(dbError => {
            fs.unlink(`pictures/${fileName}`, (err) => console.log(err));
            res.status(500).json({message: [error, dbError]})
        });
    });
});

AuthRouter.post("/login", async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({message: "Invalid request body"});

    const targetUser = (await userController.select(conn, "*", null, `WHERE username = '${username}'`))[0];

    if (targetUser == null) return res.status(404).json({message: "User not found"});

    if ((await bcrypt.compare(password, targetUser.password)) == false) return res.status(401).json({message: "Incorrect password"});

    const accessToken = jwt.sign({userId: targetUser.id, username: targetUser.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "6h"});

    return res.status(200).json({accessToken: accessToken, userId: targetUser.id, username: targetUser.username, pfp: targetUser.pfp});
});

AuthRouter.post("/is_token_valid", async (req, res) => {
    const { authToken } = req.body;
    if (authToken == null) return res.status(400).json({message: "No token provided"});

    const isTokenInvalid = (await invalid_tokensController.select(conn, "*", null, `WHERE value = '${authToken}'`))[0] != null;
    if (isTokenInvalid) return res.status(401).json(false);

    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
        if (error) return res.status(500).json({message: error.message});
        return res.status(200).json(payload);
    });
});

async function authenticateToken(req, res, next){
    const token = req.headers["authorization"] ?? req.headers["authorization"].split(" ")[1];

    if (token == null) return res.status(400).json({message: "Unauthorized"});

    const isTokenInvalid = (await invalid_tokensController.select(conn, "*", null, `WHERE value = '${token}'`))[0] != null;
    if (isTokenInvalid) return res.status(401).json({message: "Unauthorized"});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
        if (error) return res.status(500).json({message: "Unauthorized"});
        req.user = payload;
        next();
    });
}

module.exports = {AuthRouter, authenticateToken};
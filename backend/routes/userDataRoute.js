const express = require("express");
const conn = require("../db/connectionConstant");

const UserDataRouter = express.Router();
const { authenticateToken } = require("./authRoute");
const userController = require("../db/controllers/userController");
const roomController = require("../db/controllers/roomController");

UserDataRouter.get("/users", async (req, res) => {
    const data = await userController.select(conn, "*", null, null);
    res.json(data);
});

module.exports = UserDataRouter;
const express = require("express");
const conn = require("../db/connectionConstant");

const RoomDataRouter = express.Router();
const { authenticateToken } = require("./authRoute");
const userController = require("../db/controllers/userController");

RoomDataRouter.get("/user_rooms/:userId", authenticateToken, async (req, res) => {
    const { userId } = req.params;

    const data = await userController.getUserRooms(conn, userId);

    res.status(202).json(data);
});

module.exports = RoomDataRouter;
const express = require("express");
const jwt = require("jsonwebtoken");
const conn = require("../db/connectionConstant");

const RoomDataRouter = express.Router();
const { authenticateToken } = require("./authRoute");
const userController = require("../db/controllers/userController");
const roomController = require("../db/controllers/roomController");

RoomDataRouter.get("/user_rooms/:userId", authenticateToken, async (req, res) => {
    const { userId } = req.params;

    const data = await userController.getUserRooms(conn, userId);

    res.status(202).json(data);
});

RoomDataRouter.get("/room/users/:roomId", authenticateToken, async (req, res) => {
    const { roomId } = req.params;

    const data = await roomController.getRoomMembers(conn, roomId);

    res.status(202).json(data);
});

RoomDataRouter.get("/room_messages/:roomId", authenticateToken, async (req, res) => {
    const { roomId } = req.params;

    const data = await roomController.getRoomMessages(conn, roomId);

    res.status(202).json(data);
});

RoomDataRouter.post("/room/create", authenticateToken, async (req, res) => {
    const { name, password, adminId } = req.body;

    if (name == null) return res.status(402).json({message: "Invalid request body"});
    roomController.insert(conn, [name, password, adminId], ["name", "password", "admin_id"]).then(d => res.json(d));
});

module.exports = RoomDataRouter;
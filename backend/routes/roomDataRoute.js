const express = require("express");
const jwt = require("jsonwebtoken");
const conn = require("../db/connectionConstant");

const RoomDataRouter = express.Router();
const { authenticateToken } = require("./authRoute");
const userController = require("../db/controllers/userController");
const roomController = require("../db/controllers/roomController");

RoomDataRouter.get("/room/:roomId", async (req, res) => {
    const { roomId } = req.params;

    if (roomId == null) return res.status(404).json({message: "Room not found"});
    const data = (await roomController.select(conn, "*", null, `WHERE id = ${roomId}`))[0];
    const members = await roomController.getRoomMembers(conn, roomId);
    data.members = members;

    res.status(202).json(data);
});

RoomDataRouter.get("/room/is_a_member/:roomId/:userId", async (req, res) => {
    const { roomId, userId } = req.params;

    const data = await roomController.isAMember(conn, roomId, userId);

    res.status(202).json(data);
});

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
const express = require("express");
const conn = require("../db/connectionConstant");

const UserDataRouter = express.Router();
const { authenticateToken } = require("./authRoute");
const userController = require("../db/controllers/userController");
const user_roomController = require("../db/controllers/user_roomController");
const roomController = require("../db/controllers/roomController");

UserDataRouter.get("/users", async (req, res) => {
    const data = await userController.select(conn, "*", null, null);
    res.json(data);
});

UserDataRouter.post('/join_room/:roomId', async (req, res) => {
    const { roomId } = req.params; const { userId } = req.body;

    if ((await roomController.exists(conn, roomId)).response == false) return res.status(404).json({message: "Room not found"});

    res.json(await user_roomController.insert(conn, [userId, parseInt(roomId)]));
})

module.exports = UserDataRouter;
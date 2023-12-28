const conn = require("./db/connectionConstant");
const messageController = require("./db/controllers/messageController");

const io = require("socket.io")(3002, {
    cors: {
        origin: "*"
    }
});


/*
    Receiveable:
    1. send-message
*/

io.on("connection", socket => {
    socket.on("send-message", data => {
        messageController.insert(conn, [data.content, data.userId, data.roomId])
            .then(res => socket.emit("render-message", {...data, messageId: res.insertId}))
            .catch(() => socket.emit("unrender-message", data));
    })
});

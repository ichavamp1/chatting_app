const baseController = require("./baseController");

const userController = {
    select: (conn, rows="*", count=null, where=null) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "users", rows, count, where).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    insert: (conn, data, rows=["username", "password", "pfp"]) => {
        return new Promise((resolve, reject) => {
            baseController.insertQueryTable(conn, "users", rows, data).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    getUserRooms: (conn, userId) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "rooms", "*, (SELECT COUNT(*) FROM `users` WHERE id IN (SELECT user_id FROM user_room WHERE room_id = rooms.id)) as users_count", null, `WHERE id IN (SELECT room_id FROM user_room WHERE user_id = ${userId})`).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    isInRoom: (conn, userId, roomId) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "user_room", "COUNT(*) AS result", null, `WHERE user_id = ${userId} AND room_id = ${roomId}`).then(data => resolve((data[0].result >= 1))).catch(err => resolve(err));
        });
    }
}

module.exports = userController;
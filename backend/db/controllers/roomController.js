const baseController = require("./baseController");

const roomController = {
    select: (conn, rows="*", count=null, where=null) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "rooms", rows, count, where).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    insert: (conn, data, rows=["name", "password", "admin_id"]) => {
        return new Promise((resolve, reject) => {
            baseController.insertQueryTable(conn, "rooms", rows, data).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    getRoomMessages: (conn, roomId) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "messages", "*", null, `WHERE room_id = (SELECT id FROM rooms WHERE id = ${roomId})`).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    getRoomMembers: (conn, roomId) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "users", "id, username", null, `WHERE id IN (SELECT user_id FROM user_room WHERE room_id = ${roomId})`).then(data => resolve(data)).catch(error => reject(error));
        });
    }
}

module.exports = roomController;
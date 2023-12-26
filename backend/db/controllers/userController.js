const baseController = require("./baseController");

const userController = {
    select: (conn, rows="*", count=null, where=null) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "users", rows, count, where).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    insert: (conn, data, rows=["username", "password"]) => {
        return new Promise((resolve, reject) => {
            baseController.insertQueryTable(conn, "users", rows, data).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    getUserRooms: (conn, userId) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "rooms", "*", null, `WHERE id IN (SELECT room_id FROM user_room WHERE user_id = ${userId})`).then(data => resolve(data)).catch(error => reject(error));
        });
    }
}

module.exports = userController;
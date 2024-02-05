const baseController = require("./baseController");

const roomController = {
    select: (conn, colls="*", count=null, where=null) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "rooms", colls, count, where).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    insert: (conn, data, colls=["name", "password", "admin_id"]) => {
        return new Promise((resolve, reject) => {
            baseController.insertQueryTable(conn, "rooms", colls, data).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    getRoomMessages: (conn, roomId) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "messages", "*, (SELECT username FROM users WHERE id = user_id) as sent_by, (SELECT pfp FROM users WHERE id = user_id) as pfp", null, `WHERE room_id = (SELECT id FROM rooms WHERE id = ${roomId})`).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    getRoomMembers: (conn, roomId) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "users", "id, username, pfp", null, `WHERE id IN (SELECT user_id FROM user_room WHERE room_id = ${roomId})`).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    isAMember: (conn, roomId, userId) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "user_room", "COUNT(*) AS result", null, `WHERE user_id = ${userId} AND room_id = ${roomId}`).then(data => resolve((data[0].result >= 1))).catch(err => reject(err));
        });
    },
    exists: (conn, roomId) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "rooms", "*", null, `WHERE id = ${roomId}`).then(data => {
                if (data[0]) resolve({response: true, data: {...data[0]}});
                else resolve({response: false})
            }).catch(error => reject(error))
        });
    }
}

module.exports = roomController;
const baseController = require("./baseController");

const messageController = {
    select: (conn, rows="*", count=null, where=null) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "messages", rows, count, where).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    insert: (conn, data, rows=["content", "user_id", "room_id"]) => {
        return new Promise((resolve, reject) => {
            baseController.insertQueryTable(conn, "messages", rows, data).then(data => resolve(data)).catch(error => reject(error));
        })
    }
}

module.exports = messageController;
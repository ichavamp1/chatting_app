const baseController = require("./baseController");

const messageController = {
    select: (conn, colls="*", count=null, where=null) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "messages", colls, count, where).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    insert: (conn, data, colls=["content", "user_id", "room_id"]) => {
        return new Promise((resolve, reject) => {
            baseController.insertQueryTable(conn, "messages", colls, data).then(data => resolve(data)).catch(error => reject(error));
        })
    }
}

module.exports = messageController;
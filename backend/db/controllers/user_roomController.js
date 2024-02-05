const baseController = require("./baseController");

const user_roomController = {
    select: (conn, colls="*", count=null, where=null) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "user_room", colls, count, where).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    insert: (conn, data, colls=["user_id", "room_id"]) => {
        return new Promise((resolve, reject) => {
            baseController.insertQueryTable(conn, "user_room", colls, data).then(data => resolve(data)).catch(error => reject(error));
        });
    }
}

module.exports = user_roomController;
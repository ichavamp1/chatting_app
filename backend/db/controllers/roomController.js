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
    }
}

module.exports = roomController;
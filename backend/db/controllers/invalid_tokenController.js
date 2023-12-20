const baseController = require("./baseController");

const userController = {
    select: (conn, rows="*", count=null, where=null) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "invalid_tokens", rows, count, where).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    insert: (conn, data, rows=["value"]) => {
        return new Promise((resolve, reject) => {
            baseController.insertQueryTable(conn, "invalid_tokens", rows, data).then(data => resolve(data)).catch(error => reject(error));
        })
    }
}

module.exports = userController;
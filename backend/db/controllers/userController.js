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
        })
    }
}

module.exports = userController;
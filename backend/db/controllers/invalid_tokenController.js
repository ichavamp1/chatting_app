const baseController = require("./baseController");

const userController = {
    select: (conn, colls="*", count=null, where=null) => {
        return new Promise((resolve, reject) => {
            baseController.selectQueryTable(conn, "invalid_tokens", colls, count, where).then(data => resolve(data)).catch(error => reject(error));
        });
    },
    insert: (conn, data, colls=["value"]) => {
        return new Promisse((resolve, reject) => {
            baseController.insertQueryTable(conn, "invalid_tokens", colls, data).then(data => resolve(data)).catch(error => reject(error));
        })
    }
}

module.exports = userController;
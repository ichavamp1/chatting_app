const baseController = require("./baseController");

const userController = {
    query: (conn, rows="*", count=null) => {
        return new Promise((resolve, reject) => {
            baseController.queryTable(conn, "users", rows, count).then(data => resolve(data)).catch(error => reject(error));
        });
    }
}

module.exports = userController;
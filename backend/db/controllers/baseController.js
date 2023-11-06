const baseController = {
    queryTable: function(conn, tableName, rows="*", count=null){
        return new Promise((resolve, reject) => {
            conn.query(`SELECT ${rows} FROM ${tableName} ${count == null ? "" : `LIMIT ${count}`}`, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        })
    }
};

module.exports = baseController;
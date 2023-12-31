const baseController = {
    selectQueryTable: (conn, tableName, rows="*", count=null, where=null) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT ${rows} FROM ${tableName} ${where ?? ""} ${count == null ? "" : `LIMIT ${count}`}`, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        })
    },
    insertQueryTable: (conn, tableName, rows, data) => {
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO ${tableName}(${rows.join(",")}) VALUES(${data.map(item => {
                if (typeof item == "string") return `"${item}"`;
                return item;
            })})`, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        })
    }
};

module.exports = baseController;
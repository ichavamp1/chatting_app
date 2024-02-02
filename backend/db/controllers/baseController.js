const baseController = {
    selectQueryTable: (conn, tableName, colls="*", count=null, where=null) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT ${colls} FROM ${tableName} ${where ?? ""} ${count == null ? "" : `LIMIT ${count}`}`, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        })
    },
    insertQueryTable: (conn, tableName, colls, data) => {
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO ${tableName}(${colls.join(",")}) VALUES(${data.map(item => {
                if (typeof item == "string" && item.length > 0) return `"${item}"`;
                if (item == null || item == "") return "null";
                return item;
            })})`, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        })
    }
};

module.exports = baseController;
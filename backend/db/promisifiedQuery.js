function promisifiedQuery(conn, query){
    return new Promise((resolve, reject) => {
        conn.query(query, (error, result) => {
            if (error){
                reject(error);
                raeturn;
            }
            resolve(result);
        })
    })
}

module.exports = promisifiedQuery;
require("dotenv").config();
const mysql = require("mysql");
const promisifiedQuery = require("./db/promisifiedQuery");

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const users_data = `INSERT INTO users(username, password) VALUES ('admin', 'parol')`;
const messages_data = `CREATE TABLE messages(id int PRIMARY KEY AUTO_INCREMENT, content varchar(255), user_id int, FOREIGN KEY(user_id) REFERENCES users(id));`;
const rooms_data = `CREATE TABLE rooms(id int PRIMARY KEY AUTO_INCREMENT, code varchar(100) NOT NULL, password varchar(255) NULL, admin_id int, FOREIGN KEY(admin_id) REFERENCES Users(id));`;
const user_room_data = `CREATE TABLE user_room( id int PRIMARY KEY AUTO_INCREMENT, user_id int, room_id int, FOREIGN KEY(user_id) REFERENCES Users(id), FOREIGN KEY(room_id) REFERENCES Rooms(id));`

console.log(process.argv);

// insertTable(conn, users_data)
//     .catch(error => console.log(error))
//     .finally(() => conn.end());

//add seeders later
require("dotenv").config();
const mysql = require("mysql");
const promisifiedQuery = require("./db/promisifiedQuery");

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const users_table = `CREATE TABLE users(id int PRIMARY KEY AUTO_INCREMENT, username varchar(100) NOT NULL, password varchar(255) NOT NULL);`;
const messages_table = `CREATE TABLE messages(id int PRIMARY KEY AUTO_INCREMENT, content varchar(255), user_id int, FOREIGN KEY(user_id) REFERENCES users(id));`;
const rooms_table = `CREATE TABLE rooms(id int PRIMARY KEY AUTO_INCREMENT, code varchar(100) NOT NULL, password varchar(255) NULL, admin_id int, FOREIGN KEY(admin_id) REFERENCES Users(id));`;
const user_room_table = `CREATE TABLE user_room( id int PRIMARY KEY AUTO_INCREMENT, user_id int, room_id int, FOREIGN KEY(user_id) REFERENCES Users(id), FOREIGN KEY(room_id) REFERENCES Rooms(id));`;

//for logouts
const invalid_tokens = `CREATE TABLE invalid_tokens(id int PRIMARY KEY AUTO_INCREMENT, value TEXT, logged_at DATETIME DEFAULT NOW());`;

promisifiedQuery(conn, users_table)
    .then(() => promisifiedQuery(conn, messages_table))
    .then(() => promisifiedQuery(conn, rooms_table))
    .then(() => promisifiedQuery(conn, user_room_table))
    .then(() => promisifiedQuery(conn, invalid_tokens))
    .catch(error => console.log(error))
    .finally(() => conn.end());
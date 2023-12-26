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
const rooms_table = `CREATE TABLE rooms(id int PRIMARY KEY AUTO_INCREMENT, code varchar(100) NOT NULL, name varchar(255), password varchar(255) NULL, admin_id int, FOREIGN KEY(admin_id) REFERENCES users(id));`;
const messages_table = `CREATE TABLE messages(id int PRIMARY KEY AUTO_INCREMENT, content varchar(255), user_id int, room_id int, FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(room_id) REFERENCES rooms(id));`;
const user_room_table = `CREATE TABLE user_room( id int PRIMARY KEY AUTO_INCREMENT, user_id int, room_id int, FOREIGN KEY(user_id) REFERENCES Users(id), FOREIGN KEY(room_id) REFERENCES Rooms(id));`;
const invalid_tokens = `CREATE TABLE invalid_tokens(id int PRIMARY KEY AUTO_INCREMENT, value TEXT, logged_at DATETIME DEFAULT NOW());`;

const users_data = `INSERT INTO users(username, password) VALUES('dlwlrma22', '$2b$10$/QmtfEUB9NXKKuZKliCYROQCKsUnIAiqq1diDW9DkOOd0pwL0gOZa'), ('Museong', '$2b$10$Fu.WcXFy.ES21JA1JKvb/.DFa3zORBQYXekt9zeqcqxJwez86rISa'), ('kingen', '$2b$10$zFbLqQ4yfAryPNzp9HaYzuwJPH1.pHqvkYz4MdidOin1Xi6HcD04a'), ('qazwsxedcrfvdf', '$2b$10$VZIx4pIkVIsXDI9oRn6CiOpfUxWmWMxatkRWatOYS5wYS7VLubPIK'), ('subintnqls06', '$2b$10$gRBXMLRM.Uxg/cNR.0rU3O.ht6x8Ugd6BEkHkm2ohqbSqpn7icfJe');`

const drop_users = `DROP TABLE IF EXISTS users`;
const drop_messages = `DROP TABLE IF EXISTS messages`;
const drop_rooms = `DROP TABLE IF EXISTS rooms`;
const drop_user_room = `DROP TABLE IF EXISTS user_room`;
const drop_invalid_tokens = `DROP TABLE IF EXISTS invalid_tokens`;

promisifiedQuery(conn, drop_invalid_tokens) //start dropping
    .then(() => promisifiedQuery(conn, drop_messages))
    .then(() => promisifiedQuery(conn, drop_user_room))
    .then(() => promisifiedQuery(conn, drop_rooms))
    .then(() => promisifiedQuery(conn, drop_users)) //stop dropping
    .then(() => promisifiedQuery(conn, users_table)) // start creating
    .then(() => promisifiedQuery(conn, rooms_table))
    .then(() => promisifiedQuery(conn, messages_table))
    .then(() => promisifiedQuery(conn, user_room_table))
    .then(() => promisifiedQuery(conn, invalid_tokens)) //stop creating
    .then(() => promisifiedQuery(conn, users_data)) //insert user data
    .catch(error => console.log(error))
    .finally(() => conn.end()); //close connection
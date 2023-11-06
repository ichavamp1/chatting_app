const QUERY = `
CREATE TABLE users(
	id int PRIMARY KEY AUTO_INCREMENT,
    username varchar(100) NOT NULL,
    password varchar(255) NOT NULL
);

CREATE TABLE messages(
	id int PRIMARY KEY AUTO_INCREMENT,
    content varchar(255),
    user_id int,
    FOREIGN KEY(user_id) REFERENCES Users(id)
);

CREATE TABLE rooms(
	id int PRIMARY KEY AUTO_INCREMENT,
    code varchar(100) NOT NULL,
    password varchar(255) NULL,
    admin_id int,
    FOREIGN KEY(admin_id) REFERENCES Users(id)
);

CREATE TABLE user_room(
	id int PRIMARY KEY AUTO_INCREMENT,
    user_id int,
    room_id int,
    FOREIGN KEY(user_id) REFERENCES Users(id),
    FOREIGN KEY(room_id) REFERENCES Rooms(id)
);`;
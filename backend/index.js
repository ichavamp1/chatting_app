require("dotenv").config();
const express = require("express"); const app = express();
const mysql = require("mysql");
const socket = require("./socket");

const { AuthRouter } = require("./routes/authRoute");
const RoomDataRouter = require("./routes/roomDataRoute");
const UserDataRouter = require("./routes/userDataRoute");

const conn = require("./db/connectionConstant");
const userController = require("./db/controllers/userController");

app.use(require("cors")());
app.use(express.json());
app.use("/pictures", express.static("pictures"));
app.use("/api/auth", AuthRouter);
app.use("/api", RoomDataRouter);
app.use("/api", UserDataRouter);

app.listen(3001, () => console.log("Server is on"));
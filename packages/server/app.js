const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const playlistRouters = require("./routes/playlist");
const io = require("./sockets");
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/playlist", playlistRouters);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb+srv://testuser:Aa123456@cluster0.o4agl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((result) => {
    const server = app.listen(3001);
    io.init(server);
  })
  .catch((err) => console.log(err));

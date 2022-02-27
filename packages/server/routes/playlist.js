const express = require("express");
const router = express.Router();

const playlistController = require("../controllers/playlist");

router.get("/list", playlistController.getLists);

router.post("/list", playlistController.addList);

module.exports = router;

const List = require("../models/list");
const io = require("../sockets");

exports.getLists = async (req, res, next) => {
  try {
    const totalItems = await List.find().countDocuments();
    const lists = await List.find();

    res.status(200).json({
      message: "Fetched lists successfully",
      lists: lists,
      totalItems: totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addList = async (req, res, next) => {
  const body = req.body;
  const image = body.image;
  const title = body.title;
  const channelTitle = body.channelTitle;
  const videoId = body.videoId;
  const list = new List({
    image: image,
    title: title,
    channelTitle: channelTitle,
    videoId: videoId,
  });
  try {
    await list.save();
    io.getInstance().emit("list", { action: "addVideo", list: list });
    res.status(201).json({
      message: "Video created successfully",
      list: list,
      id: list.id,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

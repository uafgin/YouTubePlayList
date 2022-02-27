const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    image: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    channelTitle: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchema);

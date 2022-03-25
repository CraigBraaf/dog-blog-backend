const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    comments: {
      type: Array,
      required: false,
      default:[],
    },
    createdby: {
      type: String,
      required: true,
      
    },
    categories: {
      type: String,
      required: false,
      default:[],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);

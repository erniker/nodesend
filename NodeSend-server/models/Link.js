const moongose = require("mongoose")
const schema = moongose.Schema

const linkSchema = new moongose.Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  original_name: {
    type: String,
    required: true,
  },
  downloads: {
    type: Number,
    default: 1,
  },
  author: {
    type: moongose.Schema.Types.ObjectId,
    ref: "Users",
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = moongose.model("Links", linkSchema)

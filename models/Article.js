const mongoose = require("mongoose")
const { getFormattedDate } = require("../utils/article")

const ArticleSchema = new mongoose.Schema({
  hero: { type: String },
  title: { type: String, required: true, unique: true },
  content: { type: String },
  excerpt: { type: String, required: true },
  author: { type: String },
  profilePicture: { type: String },
  formattedDate: {
    type: String,
    default: getFormattedDate(new Date())
  }
}, { timestamps: true })

module.exports = mongoose.model("Article", ArticleSchema)
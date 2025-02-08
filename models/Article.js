const mongoose = require("mongoose")

const ArticleSchema = new mongoose.Schema({
  hero: { type: String },
  title: { type: String, required: true, unique: true },
  content: { type: String },
  excerpt: { type: String, required: true },
  author: { type: String },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
  formattedDate: {
    type: String,
    default: function() {
      const date = new Date(this.createdAt);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  }
})

module.exports = mongoose.model("Article", ArticleSchema)
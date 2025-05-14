const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  imageUrl: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

const UserBlogSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true },
  entries: [BlogSchema],
}, { timestamps: true });

module.exports = mongoose.model('UserEntry', UserBlogSchema);

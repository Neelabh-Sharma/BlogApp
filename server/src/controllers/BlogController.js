const UserBlogSchema = require('../models/Blog');

// Add a new entry for a user
exports.addEntry = async (req, res) => {
  const { email, title, subtitle, imageUrl, content } = req.body;

  if (!email || !title || !subtitle || !imageUrl || !content) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const entry = { title, subtitle, imageUrl, content };

    const userEntry = await UserBlogSchema.findOneAndUpdate(
      { email },
      { $push: { entries: entry } },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Entry added successfully', data: userEntry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all entries for a user
exports.getEntriesByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const userEntry = await UserBlogSchema.findOne({ email });

    if (!userEntry) {
      return res.status(404).json({ message: 'No entries found for this email' });
    }

    res.status(200).json({ data: userEntry.entries });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
// Get all users and their entries
exports.getAllEntries = async (req, res) => {
  try {
    const allUsers = await UserBlogSchema.find(); // Gets everything
    res.status(200).json({ data: allUsers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
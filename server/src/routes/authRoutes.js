const express = require('express');
const { login, signup } = require('../controllers/authController');
const BlogController = require('../controllers/BlogController') 
const router = express.Router();

// auth routes
router.post('/signup', signup);
router.post('/login', login);

// Blog routes
router.post('/add',BlogController.addEntry);
router.get('/:email',BlogController.getEntriesByEmail);
router.get('/',BlogController.getAllEntries);
module.exports = router;

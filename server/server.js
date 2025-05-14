require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Start the server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('✅ Database connected successfully');

    // Create HTTP server and listen
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`🚀 Server is running at: http://localhost:${PORT}`);
    });

    // Optional: Handle server-level errors
    server.on('error', (err) => {
      console.error('❌ Server error:', err);
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();

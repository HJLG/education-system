import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupRoutes } from './routes';  // Import the routes setup function

// Initialize dotenv to access environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware for CORS
app.use(cors());

// Setup the routes on the app
setupRoutes(app);

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Hello, welcome to the Education System API!');
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

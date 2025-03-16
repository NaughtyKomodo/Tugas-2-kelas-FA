require('./config/dotenv');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { connectDB } = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);

const PORT = process.env.SERVER_PORT;
const startServer = async () => {
    try {
        await connectDB(); // Tunggu koneksi database
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error('Failed to start server due to database error:', err);
        process.exit(1); 
    }
};

startServer();
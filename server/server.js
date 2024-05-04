const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const app = express();
const cors = require('cors');
const auth = require('./routes/auth');
const path = require('path');

dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });
const con = mongoose.connection;
con.on('open', () => {
    console.log('mongoDB connected.....');
});

const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// User route middleware 
app.use('/api/user', auth);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../nasa_app/dist')));

// Serve the index.html file for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../nasa_app/dist/index.html'));
});

app.listen(8080, () => {
    console.log("Server running on port 8080.....");
});

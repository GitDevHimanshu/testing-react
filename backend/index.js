const express = require("express");
const cors = require("cors");
const session = require('express-session');
const path = require('path');
const authRoute = require('./routes/authroutes');
const adminRoute = require('./routes/adminroutes');
const dbConnection = require('./model/dbConnection');
const dotenv = require("dotenv");

dotenv.config();

const app = express();
dbConnection();

app.use(cors({
    origin: "*"
}));

app.use(session({
    secret: "I-will-not-tell-you",
    resave: false,
    saveUninitialized: true,
    // Cookie: {maxAge: 40000},
    // rolling: true
}));

app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', authRoute);
app.use('/admin', adminRoute);

// Catch-all handler to send back `index.html` for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

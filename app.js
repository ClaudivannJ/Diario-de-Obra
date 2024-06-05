const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const obraRoutes = require('./src/routes/obraRoutes');

// Use routes
app.use(authRoutes);
app.use(adminRoutes);
app.use(obraRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

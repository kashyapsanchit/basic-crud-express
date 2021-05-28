const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/Auth');
const contactRoutes = require('./routes/Contacts');
const app = express();

// app.use(bodyParser.json())
app.use(express.json())
app.use('/login', authRoutes)
app.use(contactRoutes)


db.connect().then(() => {

    app.listen(3000, () => {
        console.log(`server is listening on port 3000`);
    });
})

module.exports = app;


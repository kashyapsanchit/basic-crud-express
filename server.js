const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const uri = process.env.MONGO_URI;
const port = process.env.PORT;
const authRoutes = require('./routes/Auth');
const contactRoutes = require('./routes/Contacts')

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.catch((err) => {
    console.log(err.message);
});

const app = express();

app.use(express.json())
app.use('/login', authRoutes)
app.use('/', contactRoutes)


app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

module.exports = app;


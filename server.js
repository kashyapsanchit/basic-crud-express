const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');
const Contact = require('./models');
const uri = 'mongodb+srv://sanchit:sanchit@cluster0.sqntw.gcp.mongodb.net/incred?retryWrites=true&w=majority';
const port = 3000;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.catch((err) => {
    console.log(err.message);
});

app.use(express.urlencoded({extended: true}))
app.use(upload.array()); 
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('<h1>Home</h1>')
});

app.get('/add-contact', (req,res) => {
    const contact = Contact(req.body)
    contact.save()
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err.message);
    })
});

app.get('/contacts', (req, res) => {

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    Contact.find().skip(skip).limit(10)
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        console.log(err);
    });
});

app.delete('/delete-contact/:email', (req, res) => {
    const id = req.params.email;

    Contact.findByIdAndDelete(id)
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        console.log(err);
    })
});


app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});



const express = require('express');
const bodyParser = require('body-parser')
require("dotenv").config()
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Contact = require('./models');
const uri = 'mongodb+srv://sanchit:sanchit@cluster0.sqntw.gcp.mongodb.net/incred?retryWrites=true&w=majority';
const port = 3000;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.catch((err) => {
    console.log(err.message);
});

const app = express();


app.use(express.urlencoded({extended: true}))
app.use(upload.array()); 
app.use(express.static('public'));


// Index route will show all the data added to the database yet.

app.get('/', (req, res) => {

    Contact.find()
    .then((result) => {
        
        res.send(result)
    });
    
});

app.post('/login', (req, res) => {
    // Example User
    const user = {
        id: 1,
        username: 'test',
        email: 'test@gmail.com'
    }

    jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
        res.json({
            token: token
        })
    })
})


app.post('/add-contact',authenticate, (req,res) => {
    const contact = Contact(req.body)
    contact.save()
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err.message);
    })
});

app.get('/contacts', authenticate,  (req, res) => {

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    Contact.find().skip(skip).limit(10)
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        console.log(err);
    });
});

app.delete('/delete',authenticate, async (req, res) => {
    
    Contact.findByIdAndDelete(req.query.id)
    .then((result) => {
        res.send(result)
    })
    
});


app.put('/update',authenticate, async (req, res) => {

    const contact = await Contact.findById(req.query.id)
    if (contact) {
        contact.name = req.body.name
        contact.email = req.body.email 
        contact.phone = req.body.phone
        const con = await contact.save()
        res.json(con)
    }
    else {
        res.json("Contact not Found !!!")
    }
   
})

function authenticate(req, res, next) {

    const bearerToken = req.headers["authorization"];
    const token = bearerToken && bearerToken.split(" ")[1];

    if(token == null ) res.sendStatus(403);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            res.sendStatus(401)
        }
        else {
            req.user = user
            next()
        }
    })
}

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});



const express = require('express');
const router = express.Router()
const multer = require('multer');
const upload = multer();
const Contact = require('../models');
require("dotenv").config()
const jwt = require('jsonwebtoken');


router.use(express.urlencoded({extended: true}))
router.use(upload.array()); 
router.use(express.static('public'));

router.get('/', (req, res) => {

    Contact.find()
    .then((result) => {
        
        res.send(result)
    });
    
});

router.post('/add-contact', authenticate, async (req,res) => {
    console.log(req.body);
    const contact = await Contact(req.body)
    contact.save()
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err.message);
    })
});

router.get('/contacts', authenticate,  (req, res) => {

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

router.delete('/delete',authenticate, async (req, res) => {
    
    Contact.findByIdAndDelete(req.query.id)
    .then((result) => {
        res.send(result)
    })
    
});


router.put('/update',authenticate, async (req, res) => {

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


module.exports = router;
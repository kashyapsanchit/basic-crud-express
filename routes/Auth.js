const express = require('express');
const jwt = require('jsonwebtoken');
require("dotenv").config()
const router = express.Router()


router.post('/', (req, res) => {
    // Example User
    const user = {
        id: 1,
        username: 'test',
        email: 'test@gmail.com'
    }

    jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, (err, token) => {

        if(err) console.log(err.message); 

        res.json({
            token: token
        })
    })
})



module.exports = router;
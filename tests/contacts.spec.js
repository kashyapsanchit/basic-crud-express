//Test Cases 
process.env.NODE_ENV = 'test'
const express = require('express');
const app = require('../server');
const request = require('supertest');
const Contact = require('../models');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const db = require('../db');

let token;
let id;
app.use(express.json())

beforeEach(async () => {
    await Contact.deleteMany({})
    await request(app).post('/login')
    .send({
        id: 1,
        user: 'test',
        email: 'test@gmail.com'
    })
    .then((res) => {
        token = res.body.token;
        // console.log(token);
    });

    await request(app).post('/add-contact')
    .set('Authorization', 'Bearer ' + token)
    .send({
        name: 'sanchit',
        email: 'tenzzzlol@gmail.com',
        phone: '646546465'
    })
    .then(res => {
        id = res.body._id;
    })

});


test('Should return a valid JWT token', async () => {
    await request(app).post('/login')
    .send({
        id: 1,
        user: 'test',
        email: 'test@gmail.com'
    })
    .then((res) => {
        const token = res.body.token;
        const obj = jwt.decode(token, process.env.ACCESS_KEY_SECRET)
        console.log('token');
        console.log(obj);
        expect(obj).to.have.property('user')
    });
})

test('Should add contacts in db', async () => {
    await request(app).post('/add-contact')
    .set('Authorization','Bearer ' + token)
    .send({
        name: "xen",
        email: "xen@gmail.com",
        phone: "548866995"
    })
    .then((res) => {
        // id = res.body._id;
        expect(res.body.name).to.equal('xen')
    })
    
    
});

test('Should get all contacts from db', async () => {
    await request(app).get('/')
    .expect(200)
});

test('Should be able to search using substrings', async () => {
    

    await request(app).get('/contacts')
    .set('Authorization','Bearer ' + token)
    .send({
        name: "sa",
        email: "ten"
    })
    .query({ page: '1'})  // .query({ page: '1', limit: '10'}) 
    .then((res) => {
        // console.log("This is what i wanted!");
        const body = res.body[0];
        // console.log(res.body[0]);
        expect(body.name).to.equal('sanchit'); // name == 'sanchit'
        expect(body.email).to.equal('tenzzzlol@gmail.com'); // email == 'tenzzzlol@gmail.com'
    })
});


test('Should be able to update a contact', async () => {
    await request(app).put('/update')
    .set('Authorization','Bearer ' + token)
    .query({ id: id})
    .send({
        name: "newName",
        email: "newemail@gmail.com",
        phone: "44444555"
    })
    .then((res) => {
        const body = res.body
        expect(body.name).to.equal('newName');
        expect(body.email).to.equal('newemail@gmail.com');
        expect(body.phone).to.equal('44444555');

    })
})

test('Should be able to delete a contact', async () => {

    await request(app).delete('/delete')
    .set('Authorization','Bearer ' + token)
    .query({ id: id})
    .then((res) => {

        const body = res.body
        expect(body.name).to.equal('sanchit');
        expect(body.email).to.equal('tenzzzlol@gmail.com');
        expect(body.phone).to.equal('646546465');

    })
});


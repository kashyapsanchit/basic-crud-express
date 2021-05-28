//Test Cases 

const app = require('../server')
const request = require('supertest');


describe("Testing the CRUD APIs for contacts", () => {

    // Testing localhost:3000
	it("tests the base route and returns true for status", async () => {

		const response = await request(app).get('/');
		expect(response.status).toBe(200);  

	});

    // Testing localhost:3000/contacts
    it("tests the /contacts route to list all contacts present in db", async () => {

        const response = await request(app).get('/contacts');
        expect(response.status).toBe(200)

    });

    

});
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

        const response = await request(app).get('/');
        expect(response.status).toBe(200)

    });

    it("tests the /add-contact route to add new contacts to db", async () => {


		const response = await request(app).post('/add-contact').send({
			name: 'Test John',
			email: 'randomjohn@gmail.com',
			phone: '5531365132'
		});

		expect(response.status).toBe(200);
    })

});
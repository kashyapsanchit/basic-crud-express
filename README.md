![](https://github.com/EduardoRotundaro/crud-api-express-mongo/blob/master/docs/images/01.png?raw=true)

# Basic Implementation of CRUD operations using express.js and mongoDB

# [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/6cfa069e1b6bf893c40c)

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm start` to start the local server


## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [jest](https://github.com/facebook/jest) - For running unit and integration tests for APIs 

## Deployment

- [AWS EC2 Instance](http://13.234.114.136:3000/) 


## Routes

* Login to get JWT
```sh
method: "POST"
url: "/login"
```

* Get all contacts
```sh
method: "GET"
url: "/"
```

* Add more contacts
```sh
method: "PUT"
url: "/add-contact"
```

* Search for contacts
```sh
method: "PUT"
url: "/contacts/:id"
```

* Update a contact
```sh
method: "PUT"
url: "/update/:id"
```

* Delete a contact
```sh
method: "DELETE"
url: "/delete/:id"
```


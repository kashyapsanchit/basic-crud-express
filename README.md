# Basic Implementation of CRUD operations using express.js

# [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/6cfa069e1b6bf893c40c)

## Endpoints 

<h3>
<ul>
  <li>/ : Base route returns all the data.</li>
  <li>/contacts : Base route returns all the data.<br>
    <ul>
      <li>Without params behaves like base route.</li>
      <li>Query Params you can pass : page, limit.</li>
      <li>You can search through the database using substrings also ( Pass name or email as body ).</li>
    </ul>
  </li>
  <li>/add-contacts : Add contacts to the database.</li>
  <li>/delete : Delete contact given the id as a query param.</li>
  <li>/update : Update contact given the id as a query param and new data as body.</li>
  
</ul>
</h3>

<h2>Scripts</h2>
<h3>
  <li>npm install</li>
  <li>npm start</li>
  <li>npm run test</li>
</h3>

<h2>Testing</h2>

<h3>Test Cases written using Jest and supertest</h3>

<h2>Hosting</h2>

<h3>Hosted on an AWS EC2 instance</h3>



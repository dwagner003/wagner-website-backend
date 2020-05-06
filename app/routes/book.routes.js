const jwt = require('express-jwt');
const jwks = require('jwks-rsa');


const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://dev-85d746sq.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: 'http://localhost:4200',
    algorithms: ['RS256']
});



module.exports = app => {
    const books = require("../controllers/book.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Book
    router.post("/", authCheck, books.create);
  
    // Retrieve all Books
    router.get("/", books.findAll);
  
    // Retrieve all read Books
    router.get("/read", books.findAllRead);

    // Retrieve all read Books
    router.get("/notRead", books.findAllNotRead);
  
    // Retrieve a single Book with id
    router.get("/:id", authCheck, books.findOne);
  
    // Update a Book with id
    router.put("/:id", authCheck, books.update);
  
    // Delete a Book with id
    router.delete("/:id", authCheck, books.delete);
  
    // Create a new Book
    router.delete("/", authCheck, books.deleteAll);
  
    app.use('/api/books', router);
  };
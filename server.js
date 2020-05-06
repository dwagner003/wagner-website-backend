'use strict';

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const db = require("./app/models");
//This needs to go away before production like env.
db.sequelize.sync({ force: true}).then(() => {
    console.log("Dropping and syncing db.")
});

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.unsubscribe(bodyParser.json);

app.unsubscribe(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message : "Welcome to the wagner website"});
});

require("./app/routes/book.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
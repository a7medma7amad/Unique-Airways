const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');




//Routers
const router = require("./routes/router");
const flightRouter = require("./routes/flightRouter");

// to read the .env file
const dotenv = require('dotenv');
dotenv.config();
const dbUrl = process.env.DBURL;
require('dotenv').config();



const app = express();
const port = process.env.PORT || "3000";


mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("MongoDB is now connected"))
    .catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});

app.use('/', router);
app.use('/flight', flightRouter);

// app.use(bodyParser.urlencoded())
// app.use(bodyParser.urlencoded({
//     extended: true
// }));







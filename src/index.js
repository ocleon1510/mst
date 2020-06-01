// Declarations if (!process.env.now) require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');


//Setting const port = process.env.now ? 8080 : 4000;
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'ejs');

//Middlewar

//Statics Files
app.use(express.static(path.join(__dirname,'publico')));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use(require('./routes/index'));

//Working with the server
app.listen(app.get('port'),() =>{
    console.log(`Server Listeing on port`, app.get('port'));
});


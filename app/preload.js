"use strict"
const express = require('express');
const { createServer } = require('node:http');
const path = require('path');
const ejs = require('ejs');
const app = express();
const server = createServer(app);


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'src/views'));
app.use(express.static(path.join(__dirname,'src/public')));


app.use('/',require('./src/routes/pages'));

server.listen(1000,() => {
    console.log("Server starting at http://localhost:1000");
})

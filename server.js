
const express = require('express');
const app = express();

//const heroes = require('../public/heroes.json');
const fs = require('fs')
var path = require('path');
const cors = require('cors');

app.use(express.json());

app.use(express.urlencoded({ extended: false })); 

app.use(cors());

app.options('*', cors());


app.listen(3000, (req, res) => {
    console.log('listening to port 3000')
});
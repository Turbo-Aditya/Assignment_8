const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/userAuth');


const app = express();
app.use(express.json());

app.listen(20002, ()=> {
    console.log("serveris  working on 20002");
})

mongoose.connect("mongodb+srv://adi:1234a@first.xqnvs.mongodb.net/?retryWrites=true&w=majority&appName=first")

app.use('/user', routes);
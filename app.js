const express = require('express');

const dotenv = require('dotenv');
const mongoose = require('mongoose')
const authRouths = require('./routes/authRouths')
const connectDB = require('./connectDb/db');
const cookiePaerser = require('cookie-parser')
const {requireAuth, checkUser} = require('./middleware/authMiddleware')
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookiePaerser())

//middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs')





const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`server on ${PORT}`);
    connectDB( );
})  


// routes
app.get('*', checkUser);
app.get('/', (req,res)=> res.render('home'));
app.get('/smoothies',requireAuth, (req,res)=>res.render("smoothies"))
app.use(authRouths)

//cookies
app.get('/set-cookies', (req,res)=>{

    res.cookie('newUser', false);
    res.cookie('isEmployee', true, {maxAge:1000 * 60 * 24 , httpOnly:true});

    res.send('you got the cookies!')


})


app.get('/read-cookies', (req,res)=>{
    const cookies = req.cookies;
    console.log(cookies.newUser);

    res.json(cookies)

});
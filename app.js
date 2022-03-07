const express = require('express');
const mongoose = require('mongoose');
const authRoutes=require('./routes/authRoutes')
const cookieParser=require('cookie-parser')
const  middleware=require('./middleware/authMiddleware')
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://localhost/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
 app.get('*',middleware.checkUser)
app.get('/',(req, res) => res.render('home'));
app.get('/smoothies',middleware.requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes)

//cookie primer
// app.get('/set-cookies',(req,res)=>{

//  // res.setHeader('Set-Cookie','newUser=true');
//  res.cookie('newUser',false);
//  res.cookie('isAdmin',true,{ maxAge: 1000*60*60*24, httpOnly:true});// maxAge oned day
//   res.send('you got cookies');

// });
// app.get('/read-cookies',(req,res)=>{
// const cookies=req.cookies;
// console.log(cookies)
// res.json(cookies.isAdmin);
// });


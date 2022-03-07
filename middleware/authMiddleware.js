const jwt=require('jsonwebtoken');
const User = require('../models/User');
module.exports.requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt
    //check jsonweb toke exist and is valid

    if(token){
     jwt.verify(token,'secret env'
     ,(err,decodedToken)=>{
       if(err){ console.log(err.message)
         res.redirect('/login')
        }else{
            console.log(decodedToken)
            next();
        }
     })

    }else{
        res.redirect('/login')
    }
}
module.exports.checkUser=(req,res,next)=>{
    const token=req.cookies.jwt;

    if(token){
        jwt.verify(token,'secret env'
        , async(err,decodedToken)=>{
          if(err){
               console.log(err.message)
             res.locals.user=null;
            next();
           }else{
            console.log(decodedToken);
            let user= await User.findById(decodedToken.id)
            res.locals.user=user;
            console.log(user.email)
            next();
           }})}
    else{
        res.locals.user=null;
            next();
    };
}
// ={requireAuth};
const mongoose=require('mongoose')
const {isEmail} =require('validator');
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema(
{
    email:{
        type:String,
        required:[true,'Please enter an email'],
        unique:true, // use error code
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
     type:String,
     required:[true,'Please enter password'],
     minlength:[6,'Minimum  password length is 6 characters']
    }
}
);
//mongoose hooks

// userSchema.post('save',function(doc,next){
//     console.log('new user is saved',doc)
//     next();
// })



// fire a afunction before doc is saved to db

userSchema.pre('save', async function(next){
    //this referrs to local instance of user  efore being saved
 const salt=await bcrypt.genSalt();
this.password=await bcrypt.hash(this.password,salt);
next();
})
// static method to login user
userSchema.statics.login=async function(email,password){
    const user =await this.findOne({email});
    if(user){
     const auth=await bcrypt.compare(password,user.password);
     if(auth){
         return user;
        }
     throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User=mongoose.model('user',userSchema);
module.exports= User;
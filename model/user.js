const mongoose=require('mongoose');
const crypto=require("crypto");

const userSchema=new mongoose.Schema({
    firstname: {
        type: String,
        required: [true,"name not provided"]
    },
    lastname: String,
    hashed_password: {
        type: String,
        trim: true,
        required: true
    },
    email: String,
    contacts:{
        address: String,
        linkedin: String,
        phone: Number
    },
    education: [
        {
            title: String,
            year: {
                start: Number,
                end: Number
            },
            institute: String
        }
    ],
    work: [
        {
            title: String,
            year: {
                start: Number,
                end: Number
            },
            description: String
        }
    ],
    achievements: [
        {
            title: String,
            description: String
        }
    ],
    skills: [
        {
            title: String,
            rate: Number
        }
    ],
    about: String
})

userSchema.virtual("password")
.set(function(password){
    //create temp var _password
    this._password=password;//password=the password given by user
    //generate timestamp
   // this.salt=uuidv1();
    //encrypt password
    this.hashed_password=this.encryptPassword(password);//func we will make
})
.get(function() {
    return this._password;
})

//method
userSchema.methods={
    encryptPassword: function(password){
        if(!password)
            return "";
        try{
            return crypto.createHash("sha1")
                    .update(password)
                    .digest("hex");
        }
        catch(err)
        {
            return "";
        }
    },
    authenticate: function(plainText){
        return this.encryptPassword(plainText)===this.hashed_password
    }

    
}

module.exports=mongoose.model("User",userSchema);
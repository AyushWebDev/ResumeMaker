const express=require('express');
const User=require("../model/user");
const router=express.Router();
const dotenv = require("dotenv"); 
const jwt=require("jsonwebtoken");
const auth=require("../controller/auth");
//const expressJwt=require("express-jwt");

dotenv.config();  

router.get("/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        const userInfo=await User.findById({_id: id})
        if(!userInfo){
            res.status(404).json({
                error: "Data not found"
            })
        }
        else{
            res.status(200).json(userInfo);
        }
    }catch(e){
        res.json({error: e})
        console.log(e);
    }
})

router.get("/getBasics/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        const userInfo=await User.findById({_id: id})
        if(!userInfo){
            res.status(404).json({
                error: "Data not found"
            })
        }
        else{
            res.status(200).json(userInfo);
        }
    }catch(e){
        res.json({error: e})
        console.log(e);
    }
})

router.post("/",async (req,res)=>{
    try{
        const userExist=await User.findOne({email: req.body.email})
        if(userExist)
            return res.status(400).json({
                error: "email already taken"
            });
        const user=new User(req.body);
        const userInfo=await user.save();
        res.status(201).json(userInfo);
    }catch(e){
        res.status(400).json({error: e});
        console.log(e);
    }
})

router.post("/signin",async (req,res)=>{
    try{
    const {email,password}=req.body;
    const u=await User.findOne({email});
        if(!u)
        {
            return res.status(401).json({
                error: "user with that email doesn't exist.Please try again"
            });
        }
        //if found, authenticate
        //create authenticate method in user model and use
        if(!u.authenticate(password))
        {
            return res.status(401).json({
                error: "email and password doesn't match"
            });
        }
        //generate a token with user id and secret
        const token=jwt.sign({_id: u._id},process.env.JWT_SECRET);
        //persist the token as 't' in cookie with expiry date
        res.cookie("t",token,{expire: new Date()+300000});
        //return response with user and token to frontend client
        
        return res.status(201).json({token,user: u,msg: "Signed In Successfully"});
    }catch(e){
        console.log(e);
    }
})

router.patch("/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        const updatedUser=await User.findByIdAndUpdate({_id: id},req.body,{
            new: true
        });
        res.status(201).json(updatedUser);
    }catch(e){
        res.json(e);
        console.log(e);
    }
})

router.delete("/:id",auth,async (req,res)=>{
    try{
    const id=req.params.id;
    const deletedUser=await User.findByIdAndDelete({_id: id});
    res.status(201).json(deletedUser);
    }catch(e){
        res.json(e);
        console.log(e);
    }

})

router.get("/signout",(req,res)=>{
    res.clearCookie("t");
    return res.json({
        msg: "signout success"
    });
})


module.exports=router;
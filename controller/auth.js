const jwt=require("jsonwebtoken");
const User=require("../model/user");

const auth=async (req,res,next)=>{
    try{
        const token=req.cookies.t;
        const verifyUser=jwt.verify(token,process.env.JWT_SECRET);
        console.log(verifyUser);
        next();
    }catch(e){
        res.status(401).json({error: e});
        console.log(e);
    }
}
module.exports=auth;
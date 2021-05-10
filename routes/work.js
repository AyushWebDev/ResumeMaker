const express=require('express');
const User=require("../model/user");
const router=express.Router();

router.patch("/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        const updatedData=await User.findByIdAndUpdate({_id: id},
         {$push:{work: {$each: req.body.data}}},{new: true})
         res.json(updatedData);
    }catch(e){
        res.json(e);
        console.log(e);
    }
})

router.patch("/remove/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        const deletedData=await User.findByIdAndUpdate({_id: id},
         {$pull:{work: {_id: req.body.id}}},{new: true});
         res.json(deletedData);
    }catch(e){
        res.json(e);
        console.log(e);
    }
})

module.exports=router;
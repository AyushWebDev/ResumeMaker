const express = require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const cookieParser=require("cookie-parser");

mongoose.connect('mongodb+srv://AyushMishra2802:Ayush123@cluster0.sqqqr.mongodb.net/ResumeMakerDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false})
.then(()=>{
    console.log("DB connected");
})
.catch(err=>console.log(err));

const app=express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

const userRouter=require("./routes/user");
const eduRouter=require("./routes/edu");
const workRouter=require("./routes/work");
const achievementRouter=require("./routes/achievements");

app.use("/user",userRouter);
app.use("/edu",eduRouter);
app.use("/work",workRouter);
app.use("/achievement",workRouter);

app.listen(8000,()=>{
    console.log("server is listening on port 8000");
})
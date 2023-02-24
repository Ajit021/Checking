const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/localdb')
.then(()=>console.log("Successfull"))
.catch((err)=>console.log(err));


//Schema for mock test
const mocktestSchema=new mongoose.Schema({
    Question:String,
    Options:[String],
    Correct_Answer:String,
    Subject:String

})

//model for mocktest

const Mocktest=new mongoose.model("Mocktest",mocktestSchema);

//add document for Mock test
const createdocumentmocktest=async()=>{
    try{
        const recetmocktest= new Mocktest({
            Question:"Who is Deepak ",
            Options:["MAn","Boy","Girl","Other"],
            Correct_Answer:"Man",
            Subject:"History"
        })
        const result= await recetmocktest.save();
        console.log(result)
    }catch(err){
        console.log(err)
    }
   
}

//createdocumentmocktest();




//Schema for previous
const previousSchema=new mongoose.Schema({
    Question:String,
    Options:[String],
    Correct_Answer:String,
    Year:{
        type:String,
        required:true
    }

})

//model

const Previoustest=new mongoose.model("Previoustest",previousSchema);

//add document for Mock test
const createdocumentprevious=async()=>{
    try{
        const recetmocktest= new Previoustest({
            Question:"Who is Deepak ",
            Options:["MAn","Boy","Girl","Other"],
            Correct_Answer:"Man",
            Year:"1999"
        })
        const result= await recetmocktest.save();
        console.log(result)
    }catch(err){
        console.log("Failed to Save Enter coreect data")
    }
   
}

//createdocumentprevious();





//Index Page
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

//Route to MockTest Page
app.get("/mocktest",(req,res)=>{
    res.sendFile(__dirname+"/mocktest.html");
})


//Route to Previous Year Question  Page
app.get("/previous",(req,res)=>{
    res.sendFile(__dirname+"/previous.html");
})








app.listen(port)
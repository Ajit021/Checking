const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose');
const { json } = require('express');
const validator=require('validator');



mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/localdb')
.then(()=>console.log("Successfull"))
.catch((err)=>console.log(err));

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Schema for mock test
const mocktestSchema=new mongoose.Schema({
    Question:{
        type:String,
        required:true,
        unique:true
    },
    Options:[String],
    Correct_Answer:String,
    Subject:String
})

//model for mocktest

const Mocktest=new mongoose.model("Mocktest",mocktestSchema);

//add document for Mock test
// const createdocumentmocktest=async()=>{
//     try{
//         const recetmocktest= new Mocktest({
//             Question:"Who is Deepak ",
//             Options:["MAn","Boy","Girl","Other"],
//             Correct_Answer:"Man",
//             Subject:"History"
//         })
//         const result= await recetmocktest.save();
//         console.log(result)
//     }catch(err){
//         console.log(err)
//     }
   
// }

//createdocumentmocktest();




//Schema for previous
const previousSchema=new mongoose.Schema({
    Question:{
        type:String,
        required:true,
        unique:true
    },
    Options:[String],
    Correct_Answer:String,
    Year:{
        type:Number,
        required:true

    }

})

//model
const Previoustest=new mongoose.model("Previoustest",previousSchema);

//add document for Mock test
// const createdocumentprevious=async()=>{
//     try{
//         const recetmocktest= new Previoustest({
//             Question:"Who is Deepak ",
//             Options:["MAn","Boy","Girl","Other"],
//             Correct_Answer:"Man",
//             Year:"1999"
//         })
//         const result= await recetmocktest.save();
//         console.log(result)
//     }catch(err){
//         console.log("Failed to Save Enter coreect data")
//     }
   
// }
//createdocumentprevious();





//Index Page
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

//Route to MockTest Page
app.get("/mocktest",(req,res)=>{
    res.sendFile(__dirname+"/mocktest.html");
    console.log("HI")
})


//Route to Previous Year Question  Page
app.get("/previous",(req,res)=>{
    res.sendFile(__dirname+"/previous.html");
    console.log("Hello")
})


//Post req to mock test

app.post("/mocktest",async(req,res)=>{
   try {

    
        const recetmocktest= new Mocktest({
            Question:req.body.question.trim(),
            Options:[req.body.optiona,req.body.optionb,req.body.optionc,req.body.optiond],
            Correct_Answer:req.body.answer,
            Subject:req.body.tag
        })



        const saved=await recetmocktest.save();

            console.log("Saved")
       // res.jsonp({success : true})
        res.status(201).sendFile(__dirname+"/mocktest.html")
      



   } catch (error) {
       res.send("Error Question Already exists")
       console.log("Error in Putting data please check in Mocktest")
   }
})



//Post req to previous test
app.post("/previous",async(req,res)=>{
    try {
 
 
      //checking the length of the date it should be of 4 digit
         const k=validator.isLength(req.body.date,{min:4,max:4})   
          if(k==true){
            const previoustest= new Previoustest({
                Question:req.body.question.trim(),
                Options:[req.body.optiona,req.body.optionb,req.body.optionc,req.body.optiond],
                Correct_Answer:req.body.answer,
                Year:req.body.date
            })

            const saved=await previoustest.save();
            console.log("Saved")
            //res.jsonp({success : true})
             res.status(201).sendFile(__dirname+"/previous.html")
         }
        else{
            res.send("The year length should be of 4 digit")
        }
         
 
            
       
 
 
 
    } catch (error) {
        res.send("Error Question Already exists")
        console.log("Error in Putting data please check in Previous")
    }
 })







app.listen(port)
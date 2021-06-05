// const data = require("./data.js")
const { response } = require("express");
const express = require("express");
const Datastore = require("nedb");

const app = express();
const database = new Datastore("database.db");
database.loadDatabase();

app.use(express.static('public'));
const port = process.env.PORT || 3000
app.use(express.json({limit:"1mb"}));

app.post('/api',(req,res)=>{
    console.log(req.body);
    database.insert(req.body)
    res.end();
});
app.get('/api',(req,res)=>{
    database.find({},(err,docs)=>{
        if(err){
            console.log(err => err.message);
        }
        res.json(docs);
    })
});
app.get('/api/update',(req,res)=>{
    database.update({name:"Sita"},{name:"Hari"},(err,docs)=>{
        if(err){
            console.log(err => err.message);
        }
        res.json(docs);
    })
});

app.listen(port,()=>{
    console.log("connection successful")
})
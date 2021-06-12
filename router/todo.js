const { json } = require('body-parser')
const express=require('express')
const router= express.Router()
const sqlite3= require('sqlite3').verbose()
var db= new sqlite3.Database('./db/data.db',(err)=>{
    if (err){
        return console.error(err.message)
    }
    console.log('Connected to the in-memory SQLITE database todo.')
})

router.get('/',(req,res)=>{
    db.all("SELECT * FROM input ",(err,row)=>{
        if (err){
            return console.error(err.message)
        }
        res.json(row)
    })   
})

router.post('/',(req,res)=>{  
        let dataInput=(req.body.Description) //dengan json
        db.run('INSERT INTO input(Description) VALUES(?)',dataInput)
        res.json(dataInput)
})//menyimpan data


router.delete('/:id',(req,res)=>{
    let id= String(req.params.id)
    console.log(id)
    db.run("DELETE FROM input WHERE ID=?",id,function(err){
        if(err){
            return console.error(err.message)
        }
        console.log(`Row(s) deleted: ${this.changes}`)
    })
    res.end()
})

module.exports= router
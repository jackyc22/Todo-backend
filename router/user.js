const { json } = require('body-parser')
const express= require('express')
const router= express.Router()
const sqlite3= require('sqlite3').verbose()
const auth= require('../middlewares/auth.js')
var db= new sqlite3.Database('./db/users.db',(err)=>{
    if (err){
        return console.error(err.message)
    } 
    console.log('Connected to the in-memory SQLITE database user.')
})

router.get('/',auth,(req,res)=>{
    db.all('SELECT * from USERS',(err,row)=>{
    if(err){
        res.send(500)
        return console.error(err.message)
    }
    res.json(row)
    })
})

router.post('/',(req,res,next)=>{
    db.get('SELECT COUNT(*) AS count FROM USERS',(err,row)=>{
        if(row.count > 0){
            auth(req,res,next)
        }else{
            next()
        }
    })
},(req,res)=>{
    let username= req.body.username
    let password= req.body.password
    db.run('INSERT INTO USERS(username, password) VALUES (?,?)',username ,password,function (err){
        if (err){
            res.send(500)
            return
        }
        console.dir(this)//untuk menampilkan lastID dan changes
        res.json({id:this.lastID,user:username})
    })
    console.log("berhasil ditambahkan")
})

router.delete('/:id',auth,(req,res,next)=>{
    const username=req.headers.username
    const password=req.headers.password
    const id= String(req.params.id)
    const idUser=db.get('SELECT ID FROM USERS WHERE (username=? AND password=?)',username,password,(err,row)=>{
        if(row.ID==id)
            res.send(401)
        else
            next()
    })
    
},(req,res)=>{
    let id= String(req.params.id)
    db.run('DELETE FROM USERS WHERE ID = ?',id ,function(err){
        if(err){ 
            return console.error(err.message)
        }
        res.end()
        console.log(`Row(s) deleted: ${this.changes}`) 
    }) 
    res.end()
})

module.exports= router
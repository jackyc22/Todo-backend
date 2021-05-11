const express=require('express')
const cors=require('cors')
const bodyParser = require("body-parser");
const app=express()
var sqlite3 = require('sqlite3').verbose()
var db= new sqlite3.Database('./db/data.db',(err)=>{
    if (err){
        return console.error(err.message)
    }
    console.log('Connected to the in-memory SQLITE database.')
})
// var x=""
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    //pada from ditambahkan action '/siswa'
    res.send(
        `
        <html>
            <form action="/todo" method="POST">
                <label>nama</label>
                <input name="Description"></input>
                <button name="submit">lanjut</button>
            </form>
        </html>
        `
    )
})//mengambil data
app.post('/todo',(req,res)=>{  
        // console.log(req.body) //dengan bodyparse
        let dataInput=(req.body.Description) //dengan json
        // if(dataInput.trim()!=' '){
            db.run('INSERT INTO input(Description) VALUES(?)',dataInput)
            res.json(dataInput)
        // }   
})//menyimpan data

app.get('/todo',(req,res)=>{
    db.all("SELECT * FROM input ",(err,row)=>{
        if (err){
            return console.error(err.message)
        }
        // let stringResult = ""
        // for (i of row) {
        // stringResult += i.text + "<br/>";
        // }
        // console.log(row[0].text)
        res.json(row)
    })   
})

app.delete('/todo/:id',(req,res)=>{
    let id= String(req.params.id)
    console.log(id)
    db.run("DELETE FROM input WHERE ID=?",id,function(err){
        if(err){
            return console.error(err.message)
        }
        console.log(`Row(s) deleted: ${this.changes}`)
    })
    res.end()
    // if(id){
        
    // }
    // alert("ID belum ditentukan")
})
app.listen(3000)


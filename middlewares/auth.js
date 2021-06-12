const sqlite3= require('sqlite3').verbose()
var db= new sqlite3.Database('./db/users.db',(err)=>{
    if (err){
        return console.error(err.message)
    } 
    console.log('Connected to the in-memory SQLITE database users.')
})

module.exports=function(req,res,next){
    const username= req.headers.username
    const password=req.headers.password

    db.all('SELECT username FROM USERS WHERE username=? AND password=?',username, password,function(err,rows){
        console.log(rows)
        if(rows.length > 0){
            next()
        }
        else{
            res.send(401)
        }
    })
}

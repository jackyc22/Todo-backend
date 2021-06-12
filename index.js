const express= require('express')
const cors= require('cors')
const bodyparser=require('body-parser')

const app= express()

const auth= require('./middlewares/auth.js')

const routerUser= require('./router/user.js')

const routerTodo= require('./router/todo.js')

app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())

app.get('/',(req,res)=>{
    res.send(
        `
        <html>
            <form action="/user" method="POST">
                <label>Username</label>
                <input name="username"></input>
                <label>Password</label>
                <input name="password"></input>
                <button name="submit">lanjut</button>
            </form>
        </html>
        `
    )
})
app.use('/todo',auth,routerTodo)
app.use('/user',routerUser)

app.listen(3000)


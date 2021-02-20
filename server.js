const express=require('express');
const app=express();

const jwt=require('jsonwebtoken');
const { use } = require('passport');
const { User, findAll, createNewUser } = require('./MYSQL_DB');
app.use(express.json())

const db=require('./MYSQL_DB').User

require('./MYSQL_DB')

const post=[
    {
        username:'Kim',
        title:"Post 1"
    },
    {
        username:'Jon',
        title:"Post 2"
    }
]

app.get('/',(req,res)=>{

    createNewUser('4themail@gmail.com','12349').then(user=>{
        res.send(user)
    }).catch(err=>{
        res.send(err)
    })

    // findAll().then((users)=>{
    //     res.send(users)
    // })
    // .catch((err)=>{
    //     res.send(err)
    // })
})

app.get('/post',(req,res)=>{
    res.json(post)
})

app.post('/login',(req,res)=>{
    //Authenticate the User
})

app.listen(3000,()=>{
    console.log('Server is live! at localhost:3000')
})

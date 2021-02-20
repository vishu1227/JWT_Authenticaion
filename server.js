const express=require('express');
const app=express();

const jwt=require('jsonwebtoken')
app.use(express.json())

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

app.get('/post',(req,res)=>{
    res.json(post)
})

app.post('/login',(req,res)=>{
    //Authenticate the User

    const username=req.body.username
    const user={name:username}

    jwt.sign(user,process.env.ACEES_TOKEN_aSECRET)
})

app.listen(3000,()=>{
    console.log('Server is live! at localhost:3000')
})

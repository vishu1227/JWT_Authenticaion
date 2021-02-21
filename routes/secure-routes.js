const { Router } = require('express')

const route = require('express').Router()

route.get('/profile',
(req,res,next)=>{
    res.json({
        message: 'You made it to the secure route',
        user:req.user,
        token:req.query.secret_token
    })
});

module.exports = route
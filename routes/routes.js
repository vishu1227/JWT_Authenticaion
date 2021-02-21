const route = require('express').Router()
const passport = require('passport')
const express = require('express');
const jwt = require('jsonwebtoken');

route.post('/signup',
    passport.authenticate('signup',{session:false}),async(req,res,next)=>{
        res.json({
            message:'SignUp successfully!',
            user:req.user
        })
    } 
);

route.post('/login',
    async (req,res,next)=>{
        passport.authenticate('login',async(err,user,info)=>{
                try{
                    if(err || !user){
                        const error=new Error('An error occured!');

                        return next(error);
                    }

                    req.login(user,{session:false},async(err)=>{
                        if(err)
                        {
                            return next(err)
                        }
                        else{
                            const body={id:user.id,email:user.email}
                            let KEY='82d997dbb61c9f8b3253df7913508537117bc546c74e0340cc733a097a06981dfe468853a4900e4cba0b05a262ebe60db8b61b334a3231ee794646d83b6926fc'
                            const token=jwt.sign({user:body},KEY);

                            return res.json({token});
                        }
                    });
                }
                catch(error){
                    return next(error);
                }
            }
        )(req,res,next)
    }
);

module.exports = route;
const { use } = require('passport');
const passport=require('passport');
const bcrypt=require('bcrypt')
const { createNewUser, findOne } = require('../MYSQL_DB');
const { ExtractJwt } = require('passport-jwt');
const localStrategy=require('passport-local').Strategy;
const JWTstrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;


require('../MYSQL_DB')

passport.use('signup',new localStrategy(
    {
        usernameField:'email',
        passwordField:'password'
    },
    //Sign Up authentication
    async (email,password,done)=>{
        createNewUser(email,password)
        .then((user)=>{
            //error:null,user
            return done(null,user);
        })
        .catch(err=>{
            done(err)
        })
    }
));

passport.use('login',new localStrategy(
    {
        usernameField:'email',
        passwordField:'password'
    },
    async (email,password,done)=>{
        findOne({email:email}).then(user=>{
            if(user==null)
            {
                return done(null,false,{message:'Email doest exsit!'})
            }
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err)
                {
                    return done(err,false,{message:'Some error ocuured!'});
                }
                if(!isMatch){
                    return done(null,false,{message:'Wrong password!'})
                }
                else{
                    return done(null,user,{message:'Logged in Succesfully!'})
                }
            })
        })
        .catch((err)=>{
            return done(err);
        })
    }
));

passport.use(
    new JWTstrategy(
        {
            secretOrKey:'82d997dbb61c9f8b3253df7913508537117bc546c74e0340cc733a097a06981dfe468853a4900e4cba0b05a262ebe60db8b61b334a3231ee794646d83b6926fc',
            jwtFromRequest:ExtractJwt.fromUrlQueryParameter('secret_token')
        },
        async (token,done)=>{
            try{
                return done(null,token.user);
            }catch(err){
                done(err)
            }
        }
    )
);

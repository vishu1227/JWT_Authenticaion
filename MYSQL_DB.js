const Sequelize = require('sequelize')
const bcrypt=require('bcrypt')

const db=new Sequelize('JWT_Auth','JWT','JWT_token',{
    host:'localhost',
    dialect:'mysql',
    pool:{
        min:0,
        max:5
    }
})

const User=db.define('users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true    
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

db.sync().then(()=>{
    console.log('DB has been created!')
}).catch((err)=>{
    console.log(err)
})

const createNewUser=async (email,password,check)=>{
    return await User.create({
        email:email,
        password:await bcrypt.hash(password, 10)
    })
}

const findAll=async ()=>{
    return await User.findAll();
}

const findOne=async (obj)=>{
    return await User.findOne({where:obj})
}

exports=module.exports={
    User,createNewUser,findAll,findOne
}
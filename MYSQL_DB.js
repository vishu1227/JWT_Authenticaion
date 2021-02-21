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

const createNewUser=async (email,password)=>{
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

const isValidPassword = async (Epassword,userpassword)=>{
    await bcrypt.compare(Epassword,userpassword,(err,isMatch)=>{
        if(err)
            throw err;
        else if(!isMatch){
            console.log('Password doest match!');
            return "Yes matched!"
        }
        else{
            console.log('Password match')
            return "Not matched!"
        }
    })
}

exports=module.exports={
    User,createNewUser,findAll,findOne,isValidPassword
}
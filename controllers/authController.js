const AdminUser = require("../models/AdminUserModel")
const jwt = require("jsonwebtoken")
const { promisify } = require("util")


const signToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in your environment variables');
}

    //payload, secret,expires in time,
    return jwt.sign({id: id}, process.env.JWT_SECRET)
}

const createSendToken = (user,statusCode,req, res) => {

    try{
      console.log("userid", user._id)
      const token = signToken(user._id)
      console.log(token, ":token")
      const cookieOptions =  {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict'
      }
    
    res.cookie('jwt', token, cookieOptions)
    //remove password from output
    user.password = undefined
  
    res.status(statusCode).json({
        status: "success",
        token,
        data : {
          user
        }
    })
    }catch(e){
      console.log(e)
      res.status(401).json({
        status: "failed",
        message : e
      })
    }
  }

exports.login = async(req,res) => {

    try{
        const {user, password} = req.body

        if(!user || !password) return res.status(401).json({
            status: "failed",
            message: "Please provide user and password!"
          })

        const isUser = await AdminUser.findOne({user}).select('+password')

        if(!isUser || !isUser.correctPassword(password, isUser.password)) return res.status(401).json({
            status: "failed",
            message: "Incorrect email or password"
          })
    
        createSendToken(isUser, 200, req,res)



    }catch(e) {
        console.log(e)
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
}


exports.createUser = async(req,res) => {

    try{
        const {user, password} = req.body

        const isUser = await AdminUser.create({user, password})

        res.status(200).json({
            status: 'success',
            data: isUser
        })

    }catch(e) {
        console.log(e)
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
}


exports.protect = async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    const authorizationHeader = req.headers['authorazition'];
    
    if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
      token = authorizationHeader.split(' ')[1];
    } else {
      console.log('Authorization header format is incorrect or missing');
    }
  
  
    if (!token) {
      return next(
        new Error('You are not logged in! Please log in to get access.')
      );
    }
  
    // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await AdminUser.findById(decoded.id);

  if (!currentUser) {
    return res.status(401).json({
      status:"failed",
      message: 'The user belonging to this token does no longer exist.'
    })
  }

    // 4) Check if user changed password after the token was issued

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
   
  
    next();
  };
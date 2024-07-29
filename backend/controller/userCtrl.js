const { ErrorHandler } = require('../middleware/errorMiddleware');
const User = require('../models/userSchema');
const {generateToken} = require('../utils/jwtToken'); 

const userRegister = async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  
  if (!firstName || !lastName || !email || !password || !role) {
    return next(new ErrorHandler("Please fill the form", 400));
  }

  try {
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("Email already registered", 400));
    }

    const user = await User.create({ firstName, lastName, email, password, role });
    generateToken(user, 'User Registered Successfully', 200, res);
  } catch (error) {
    return next(error);
  }
};

 const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }
  
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }
    
    generateToken(user, "Login Successfully!", 201, res);
  }

module.exports = { userRegister, userLogin };

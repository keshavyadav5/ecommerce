const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../../models/User");

const register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    const user = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    // console.error("Registration Error:", error.message);
    return res.status(500).json({
      success: false,
      message: `Error registering user, ${error.message}`,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, isUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: isUser._id,
        email: isUser.email,
        role: isUser.role,
        userName: isUser.userName,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          id: isUser._id,
          email: isUser.email,
          role: isUser.role,
          userName: isUser.userName,
        },
      });

  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({
      success: false,
      message: `Error logging in user: ${error.message}`,
    });
  }
};

const logout = (req,res) => {
  res.clearCookie('token').json({
    success: true,
    message: "Logged out successfully",
  })
}

// auth middleware
const authMiddleware = async (req,res,next) => {
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    })
  }
}


module.exports = { 
  register,
  login,
  logout,
  authMiddleware
 };

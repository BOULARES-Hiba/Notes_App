import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register
import { User } from "../../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "CLIENT_SECRET_KEY";
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || "1h";
const COOKIE_MAX_AGE = process.env.COOKIE_MAX_AGE || 3600000;

export const register = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.json({
      success: false,
      message: "Username, email, and password are required.",
    });
  }

  if (password.length < 6) {
    return res.json({
      success: false,
      message: "Password must be at least 6 characters long.",
    });
  }

  try {
    const foundUser = await User.findOne({ $or: [{ userName }, { email }] });
    if (foundUser) {
      return res.json({
        success: false,
        message: "User name or email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Registration error:", error.message);
   return res.status(500).json({
      success: false,
      message: "Internal server error during registration",
    });
  }
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "email, and password are required .",
    });
  }

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.json({
        success: false,
        message: "User doesn't exist, please register first. ",
      });
    }

    const comparison = await bcrypt.compare(password, foundUser.password);
    if (!comparison) {
      return res.json({
        success: false,
        message: "Wrong password, please try again.",
      });
    }
    const token = jwt.sign(
      {
        id: foundUser._id,
        role: foundUser.role,
        email: foundUser.email,
        userName: foundUser.userName,
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRATION }
    );
   
     res.cookie("token", token, { 
       httpOnly: true,
       
      sameSite: "strict",
      maxAge: COOKIE_MAX_AGE
    }).json({
      success: true,
      message: "Logged in successfully.",
      user: {
        id: foundUser._id,
        role: foundUser.role,
        email: foundUser.email,
        userName: foundUser.userName,
      }
    });
  } catch (error) {
    console.error("login error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error during login",
    });
  }
};



//logout
export const logout = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token ||req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};
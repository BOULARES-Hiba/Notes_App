import express from 'express';
import { register , login ,logout,authMiddleware} from '../../controllers/auth/authController.js';

export const AuthRouter  = express.Router()

AuthRouter.post('/register',register)
AuthRouter.post('/login',login)
AuthRouter.post('/logout', logout)
AuthRouter.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

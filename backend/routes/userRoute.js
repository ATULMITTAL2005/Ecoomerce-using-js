import express from 'express';
import { loginUser, registerUser, adminLogin } from "../controllers/userControllers.js";



const userRouter = express.Router();

// with this route we create geta nd post metjod
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/admin',adminLogin);


export default userRouter;
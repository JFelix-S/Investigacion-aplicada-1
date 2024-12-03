import { Router } from 'express';
import { register, login } from '../controllers/user'; 
import { protectedResource } from "../controllers/info";
import validateToken from "./validate-token";

const router = Router();

router.post('/register',register)
router.post('/login',login)
router.get('/protected-resource', validateToken, protectedResource)

export default router;

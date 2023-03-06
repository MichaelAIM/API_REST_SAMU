import { Router } from "express";
import { loginApp, login } from "../controller/authController";

const router = Router();

router.post('/login', login);
router.get('/loginApp/:password', loginApp);

export default router;
import express from 'express'

const router = express.Router();

import { register, validateCode } from '../controller/register.controller.js';
import { login, logout } from '../controller/login.controller.js';
import { findUserById } from '../utils/findUser.js';
import { checkUserAuth } from '../utils/checkUser.js';
import { verifyToken } from '../middleware/tokenValidation.js';
import { checkUserlogged } from '../utils/checkUser.js';

router.get('/', (req, res) => {
    res.send('acessando autenticação')
});

router.get('/:id/verify/:token', findUserById, validateCode)
router.get('/verify/:userId', verifyToken, checkUserlogged)
router.get('/validate-token', verifyToken, (req, res) => {
    return res.status(200).json('token válido')
})

router.post('/logout', logout)
router.post('/sign-in', checkUserAuth, register)
router.post('/log-in', checkUserAuth, login)

export default router
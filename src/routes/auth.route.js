import express from 'express'

const router = express.Router();

import { register, validateCode } from '../controller/register.controller.js';
import { findUserById } from '../utils/findUser.js';

router.get('/', (req, res) => {
    res.send('acessando autenticação')
});

router.get('/:id/verify/:token', findUserById, validateCode)

router.post('/sign-in', register)

export default router
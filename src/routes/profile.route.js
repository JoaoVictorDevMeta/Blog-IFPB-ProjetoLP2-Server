import express from 'express'
import { db } from '../lib/db.js';

import { findUserById } from '../utils/findUser.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('profile Route')
})

router.get('/:id', findUserById, (req, res) => {
    res.send(req.user)
})

router.get('/:id/posts', findUserById, async (req, res, next) => {
    try{
        const posts = await db.blog.findMany({
            where:{
                authorId: req.user.id
            }
        })
        res.send(posts)
    }catch(e){
        console.log(e)
        next(e)
    }
})

export default router;
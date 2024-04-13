import express from 'express'
import { db } from '../lib/db.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('acessando usuario')
})

router.get('/profile/:id', async (req, res) => {
    var userId = Number(req.params.id);
    if(userId) {
        try{
            const User = await db.user.findUnique({
                where: {
                    id: userId
                }
            })
            return res.send(User);
        } catch(err) {
            next(err)
        }
    }  
    return res.status(404).json('invalid user')
})

export default router;
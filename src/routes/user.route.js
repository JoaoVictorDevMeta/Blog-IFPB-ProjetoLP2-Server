import express from 'express'
import { db } from '../lib/db.js';
import { validateRequest } from '../controller/validator/validation.js';

import { userEditSchema } from '../controller/validator/userSchema.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send(req.user)
})

router.post('/edit/name', validateRequest(userEditSchema), async (req, res, next) => {
    const {nome} = req.body;
   
    try{
        const newInfo = await db.user.update({
            where:{
                id: req.user.id
            },
            data:{
                name: nome
            }
        })
        res.send(newInfo)
    }catch (e){
        console(e)
        next(e)
    }
})

router.post('/edit/description', validateRequest(userEditSchema), async (req, res, next) => {
    const {description} = req.body;
   
    try{
        const newInfo = await db.user.update({
            where:{
                id: req.user.id
            },
            data:{
                description
            }
        })
        res.send(newInfo)
    }catch (e){
        console(e)
        next(e)
    }
})

router.post('/edit/course', validateRequest(userEditSchema), async (req, res, next) => {
    const {course} = req.body;
   
    try{
        const newInfo = await db.user.update({
            where:{
                id: req.user.id
            },
            data:{
                course
            }
        })
        res.send(newInfo)
    }catch (e){
        console(e)
        next(e)
    }
})

export default router;
import express from "express";
import { db } from "../lib/db.js";

const router = express.Router();

router.get('/', (req ,res) => {
    res.send('acessando blog')
})

router.get('/:id', async (req , res, next) => {
    const id = Number(req.params.id);
    
    if(!id) return res.status(400).send('Invalid ID');

    try{
        const blog = await db.blog.findUnique({
            where: {
              id: id
            },
            include: {
              author: true,
              content: true,
            },
        });

        return res.send(blog)
    }catch(e){
        console.log(e)
        next(e)
    }
})

export default router;
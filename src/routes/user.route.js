import express from 'express'
import { db } from '../lib/db.js';
import { validateRequest } from '../controller/validator/validation.js';

import { userEditSchema } from '../controller/validator/userSchema.js';
import { blogSchema } from '../controller/validator/blogSchema.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send(req.user)
})

router.put('/edit/name', validateRequest(userEditSchema), async (req, res, next) => {
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

router.put('/edit/description', validateRequest(userEditSchema), async (req, res, next) => {
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

router.put('/edit/course', validateRequest(userEditSchema), async (req, res, next) => {
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

router.post('/newpost', validateRequest(blogSchema), async(req, res, next) => {
    const { posts, title, subTitle } = req.body;
    
    try {
        const blogData = {
            title,
            subTitle,
            authorId: req.user.id,
            content: {
                create: posts.map((post, index) => ({
                    title: post.title,
                    content: post.content,
                    offset: index
                }))
            }
        };

        const newBlog = await prisma.$transaction([
            prisma.blog.create({
                data: blogData,
            })
        ]);

        res.json(newBlog);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/del/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const blog = await db.blog.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.json(blog);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

export default router;
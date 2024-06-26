import express from 'express'
import { db } from '../lib/db.js';
import { validateRequest } from '../controller/validator/validation.js';

import { userEditSchema } from '../controller/validator/userSchema.js';
import { blogSchema } from '../controller/validator/blogSchema.js';
import { uploadImage, uploadImages } from '../utils/uploadImage.js';

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
        console.log(e)
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
        console.log(e)
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
        console.log(e)
        next(e)
    }
})

router.put('/edit/image', uploadImage, async (req, res, next) => {
    try{
        const newInfo = await db.user.update({
            where:{
                id: req.user.id
            },
            data:{
                imageUrl: req.imageUrl
            }
        })
        return res.send(newInfo)
    }catch (e){
        console.log(e)
        next(e)
    }
});

router.post('/newpost', uploadImages, validateRequest(blogSchema), async(req, res, next) => {
    //dados do blog (parent)
    const { title, subTitle, category } = req.body;
    const validCategories = ['Pesquisa', 'Projeto', 'Trabalho', 'Anuncio', 'Teste'];
    //tive que fazer pois formdata não aceita JSON, e não havia como colcoar um array para enviar
    const posts = JSON.parse(req.body.posts); // passando para JSON o ocnteudo (child)
    if (!posts || !posts.length) {
        return res.status(400).json({ error: 'Post content is required' });
    }
    
    try {
        if (!validCategories.includes(category)) {
            return res.status(400).json({ error: 'Invalid category' });
        }

        const blogData = {
            title,
            subTitle,
            authorId: req.user.id,
            category: category,
            content: {
                create: posts.map((post, index) => ({
                    title: post.title,
                    content: post.content,
                    offset: index, // parecido com a fragmentação
                    imageUrl: req.imageUrls?.[index] || null // se não houver imagem, envia nulo (imagem é opcional)
                }))
            }
        };

        const newBlog = await db.$transaction([
            db.blog.create({
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

router.post('/follow/:user_id', async (req, res, next) => {
    const userId = parseInt(req.params.user_id);

    if (req.user.id === userId) {
        return res.status(400).json({ error: 'You cannot follow yourself' });
    }

    try {
        const existingFollow = await db.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: req.user.id,
                    followingId: userId
                }
            }
        });

        if (existingFollow) {
            return res.status(400).json({ error: 'You are already following this user' });
        }

        const follow = await db.follow.create({
            data: {
                followerId: req.user.id,
                followingId: userId
            }
        });
        res.json(follow);
    } catch (e) {
        console.error(e);
        next(e);
    }
})

router.delete('/unfollow/:user_id', async (req, res, next) => {
    const userId = parseInt(req.params.user_id);

    try {
        const existingFollow = await db.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: req.user.id,
                    followingId: userId
                }
            }
        });

        if (!existingFollow) {
            return res.status(400).json({ error: 'You are not following this user' });
        }

        const follow = await db.follow.delete({
            where: {
                followerId_followingId: {
                    followerId: req.user.id,
                    followingId: userId
                }
            }
        });
        res.json(follow);
    } catch (e) {
        console.error(e);
        next(e);
    }
})

export default router;
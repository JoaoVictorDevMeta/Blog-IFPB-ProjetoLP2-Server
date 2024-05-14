import express from 'express'
import { db } from '../lib/db.js';
import joi from 'joi';

import { editSchema } from '../controller/validator/commentSchema.js';

const router = express.Router();

// querie para adicionar, tanto os comentarios principais quanto as respostas
// se o parent_id for nulo, é um comentario principal
router.post('/:blog_id/new/:parent_id?', async (req, res, next) => {
    // precisamos do id do usuario logado, id do blog, e o texto
    const content = req.body.content; //conteudo
    const blog_id = Number(req.params.blog_id); //o blog
    const user_id = req.user.id; //o usuário
    const parent_id = req.params.parent_id ? Number(req.params.parent_id) : null;

    if(!blog_id) return res.status(400).send('Invalid Blog ID');

    try{
        const comment = await db.comment.create({
            data: {
                content,
                blogId: blog_id,
                userId: user_id,
                parentId: parent_id
            }
        });

        res.send(comment)
    } catch(e){
        console.log(e)
        next(e)
    }
})

router.put('/edit/:comment_id', async (req, res, next) => {
    const content = req.body.content; //conteudo
    const comment_id = Number(req.params.comment_id); // o comentario

    const { error } = editSchema.validate({ content: req.body.content, comment_id: req.params.comment_id });
    
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try{
        const comment = await db.comment.update({
            where: {
                id: comment_id
            },
            data: {
                content
            }
        });

        res.send(comment)
    } catch(e){
        console.log(e)
        next(e)
    }
})

router.delete('/delete/:comment_id', async (req, res, next) => {
    const comment_id = Number(req.params.comment_id); // o comentario

    try{
        const comment = await db.comment.delete({
            where: {
                id: comment_id
            }
        });
        res.send(comment)
    } catch(e){
        console.log(e)
        next(e)
    }
});

//this just use on develop mode
router.get('/:blog_id/all', async(req, res, next) => {
    const blog_id = Number(req.params.blog_id);
    
    try{
        const comments = await db.comment.findMany({
            where: {
                blogId: blog_id,
                parentId: null, // Fetch only top-level comments
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                    }
                }
            },
        });

        // Recursive function to fetch replies
        const fetchReplies = async (comment) => {
            const replies = await db.comment.findMany({
                where: {
                    parentId: comment.id,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            imageUrl: true,
                        }
                    }
                },
            });

            // Fetch replies for each reply
            for (let reply of replies) {
                reply.replies = await fetchReplies(reply);
            }

            return replies;
        };

        // Fetch replies for each comment
        for (let comment of comments) {
            comment.replies = await fetchReplies(comment);
        }

        res.json(comments);
    }catch(e){
        console.log(e)
        next(e)
    }
});

export default router;
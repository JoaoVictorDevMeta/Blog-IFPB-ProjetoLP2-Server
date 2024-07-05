import joi from 'joi';
import { PostCategory } from '@prisma/client';

export const blogSchema = joi.object({
    title: joi.string()
        .pattern(/^[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ.,;:!? ]+$/i)
        .min(10)
        .required(),
    category: joi.string()
        .valid(...Object.values(PostCategory))
        .required(),
    subTitle: joi.string()
        .min(20)
        .pattern(/^[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ.,;:!? ]+$/i)
        .required(),
    image: joi.any(),
    posts: joi.string().required()
});

const postSchema = joi.object({
    title: joi.string().required(),
    content: joi.string().required()
});
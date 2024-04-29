import joi from 'joi';

export const blogSchema = joi.object({
    title: joi.string()
        .pattern(/^[a-zA-Z0-9 áàâãéèêíïóôõöúçñ ,]*$/)
        .required(),
    category: joi.string()
        .pattern(/^[a-zA-Z0-9 áàâãéèêíïóôõöúçñ ,]*$/)
        .required(),
    subTitle: joi.string()
        .pattern(/^[a-zA-Z0-9 áàâãéèêíïóôõöúçñ ,]*$/)
        .required(),
    image: joi.any(),
    posts: joi.string().required()
});

const postSchema = joi.object({
    title: joi.string().required(),
    content: joi.string().required()
});
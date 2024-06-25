import joi from 'joi';

export const blogSchema = joi.object({
    title: joi.string()
        .pattern(/^[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ.,;:!? ]+$/i)
        .required(),
    category: joi.string()
        .pattern(/^[a-zA-Z0-9 áàâãéèêíïóôõöúçñ ,]*$/)
        .required(),
    subTitle: joi.string()
        .pattern(/^[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ.,;:!? ]+$/i)
        .required(),
    image: joi.any(),
    posts: joi.string().required()
});

const postSchema = joi.object({
    title: joi.string().required(),
    content: joi.string().required()
});
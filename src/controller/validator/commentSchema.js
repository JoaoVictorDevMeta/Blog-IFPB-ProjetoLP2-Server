import joi from 'joi'

export const editSchema = joi.object({
    content: joi.string()
        .max(400)
        .pattern(/^[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ.,;:!? ]+$/i)
        .required(),
    comment_id: joi.number()
        .integer()
        .required()
})

const newSchema = joi.object({
    content: joi.string()
        .max(400)
        .pattern(/^[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ.,;:!? ]+$/i)
        .required(),
    blog_id: joi.number()
        .integer()
        .required()
})
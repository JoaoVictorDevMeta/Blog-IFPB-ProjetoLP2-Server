import joi from 'joi'

export const editSchema = joi.object({
    content: joi.string()
        .pattern(/^[a-zA-Z0-9 áàâãéèêíïóôõöúçñ ,.]*$/)
        .required(),
    comment_id: joi.number()
        .integer()
        .required()
})

const newSchema = joi.object({
    content: joi.string()
        .pattern(/^[a-zA-Z0-9 áàâãéèêíïóôõöúçñ ,.]*$/)
        .required(),
    blog_id: joi.number()
        .integer()
        .required()
})
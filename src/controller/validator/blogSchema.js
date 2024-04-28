import joi from 'joi'

export const blogSchema = joi.object({
    title: joi.string()
        .pattern(/^[a-zA-Z0-9 áàâãéèêíïóôõöúçñ ,]*$/)
        .required(),
    subTitle: joi.string()
        .pattern(/^[a-zA-Z0-9 áàâãéèêíïóôõöúçñ ,]*$/)
        .required(),
    posts: joi.array()
        .items(
        joi.object({
            title: joi.string()
                .required(),
            content: joi.string()
                .required(),
        })
        )
        .min(1)
        .required(),
  });
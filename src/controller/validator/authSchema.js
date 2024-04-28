import joi from 'joi'

const Cursos = [
    "Informática",
    "Edificações",
    "Eletrônica",
    "Mecânica",
    "Eletrotécnica",
    "Contabilidade",
    "Controle Ambiental",
    "Instrumento Musical"
]

export const authLoginSchema = joi.object({
    email: joi.string()
        .email({ minDomainSegments: 2 })
        .required(),

    password: joi.string()
        .required(),
})

export const authRegisterSchema = joi.object({
    nome: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: joi.string()
        .email({ minDomainSegments: 2 })
        .required(),

    password: joi.string()
        .min(6)
        .max(15)
        .required(),

    course: joi.string()
        .valid(...Cursos)
        .required(),
})
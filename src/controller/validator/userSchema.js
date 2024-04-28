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

export const userEditSchema = joi.object({
    nome: joi.string()
        .alphanum()
        .min(3)
        .max(30),

    course: joi.string()
        .valid(...Cursos),

    description: joi.string()
        .pattern(/^[a-zA-Z0-9 .,"'-]*$/),
})
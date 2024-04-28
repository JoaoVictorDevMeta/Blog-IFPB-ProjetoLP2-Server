import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findUserById = async(req, res, next) => {
    const id = Number(req.params.id);
    if(!id) return res.status(403).json('Usuario Inválido');
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if(!user) return res.status(404).json('usuario nao encontrado');
        req.user = user;
        next()
    } catch (error) {
        next(error);
    }
}
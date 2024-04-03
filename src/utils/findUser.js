import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findUserById = async(req, res, next) => {
    const id = req.params.id;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        });
        next()
        
    } catch (error) {
        next(error);
    }
}
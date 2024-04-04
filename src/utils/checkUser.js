import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const checkUserAuth = (req, res, next) => {
    if (req.cookies.access_token) {
        // User is already authenticated, redirect to home page
        res.status(403).json('Usuario ja está autenticado');
    } else {
        // User is not authenticated, proceed to next middleware
        next();
    }
}

export const checkUserlogged = async (req, res) => {
    const id = req.params.userId;

    try{
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if(!user){
            return res.status(404).json('Usuario não encontrado')
        }
        return res.status(200).json('userLogged')
    } catch(e) {
        console.log(e)
        return res.status(500).json('Erro no servidor')
    }
}
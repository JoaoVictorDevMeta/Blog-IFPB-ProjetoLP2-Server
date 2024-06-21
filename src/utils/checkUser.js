import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const checkUserAuth = (req, res, next) => {
    if (req.cookies.access_token) {
        res.status(403).json('Usuario ja está autenticado');
    } else {
        next();
    }
}

export const checkUserlogged = async (req, res, next) => {
    const id = Number(req.params.id);
    if(!id) return res.status(403).json('Usuario Inválido'); 
    //usuario NÃO PODE existir do Banco de Dados

    try{
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if(!user) return res.status(404).json('Usuario não encontrado')
        //Usuario não existe no Banco de Dados
        if(user.id !== req.userId) return res.status(401).json('Usuario não está autenticado')
        //Usuario exigido não está autenticado corretamente

        req.user = user
        next() // envia o usuario para proxima rota
    } catch(e) {
        console.log(e)
        next(e)
    }
}
import bcrypt from 'bcrypt';
import { sendMail } from "../utils/sendEmail.js";
import { PrismaClient } from "@prisma/client";
import crypto from 'crypto'

const prisma = new PrismaClient();

export const register = async (req, res, next) => {
    const User = req.body
    try{
        const user = await prisma.user.findUnique({
            where: {
                email: User.email
            }
        })
        if(user){
            return res.status(400).json({"message": 'Email já cadastrado'})
        }
    }catch(e){
        console.error(e);
        next(e)
    }
    
    let passwd = await bcrypt.hash(User.password, 10);
    let role = 'aluno';

    try{
        const newUser = await prisma.user.create({
            data: {
                email: User.email,
                name: User.nome,
                course: User.curso || 'teste',
                password: passwd,
                role: role
            }
        })

        let expiryDate = new Date(Date.now() + 3600000);
        const dbToken = await prisma.token.create({ // create token
            data: {
                userId: newUser.id,
                token: crypto.randomBytes(32).toString('hex'),
                expiresAt: expiryDate,
            },
        });

        const url = `${process.env.BASE_URL}auth/${newUser.id}/verify/${dbToken.token}`; // create verification url

        await sendMail(newUser.email, "Verificação de Email", url)

        res.status(201).json({"message": 'Um email enviando para sua conta, por favor verifique'})
    }catch(e){
        console.log(e)
        next(e)
    }
}

export const validateCode = async (req, res, next) => {
    const token = req.params.token;
    const userId = req.params.id;

    try {
        const dbToken = await prisma.token.findUnique({
            where: { token: token },
        });
        //validations
        if (!dbToken || new Date() > dbToken.expiresAt) { // expired
            await prisma.token.delete({ // token now can be resent
                where: { token: dbToken.token },
            });
            return res.sendStatus(401)
        }
        if (dbToken.userId !== Number(userId)) { // not your token
            return res.sendStatus(401)
        } 

        const updatedUser = await prisma.user.update({ // update its status
            where: { id: Number(userId) },
            data: { verified: true },
        });

        await prisma.token.delete({ // token now cannot be used anymore
            where: { token: dbToken.token },
        });

        return res.sendStatus(200)
    } catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
}
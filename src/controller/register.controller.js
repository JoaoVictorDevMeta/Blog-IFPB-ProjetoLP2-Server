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

        const expiryDate = new Date();
        /*const lastToken = prisma.token.findUnique({ //future addition, define a limit of time between requests
            where: {userId: newUser.id} 
        })
        console.log(lastToken)*/

        expiryDate.setHours(expiryDate.getHours() + 1);
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
            return res.status(401).send(`
                <h1>Email Verification</h1>
                <p>Token Expirado.</p>
            `);
        }
        if (dbToken.userId !== Number(userId)) { // not your token
            return res.status(401).send(`
                <h1>Email Verification</h1>
                <p>Token Inválido.</p>
            `);
        } 

        const updatedUser = await prisma.user.update({ // update its status
            where: { id: Number(userId) },
            data: { verified: true },
        });

        await prisma.token.delete({ // token now cannot be used anymore
            where: { token: token },
        });

        res.status(200).send(`
            <h1>Email Verification</h1>
            <p>Email verificado com sucesso!.</p>
        `)
    } catch (e) {
        console.log(e)
        res.status(500).send(`
            <h1>Email Verification</h1>
            <p>There was an error verifying your email. Please try again later.</p>
        `);
    }
}
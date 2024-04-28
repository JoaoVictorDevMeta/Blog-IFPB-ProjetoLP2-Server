import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendMail } from '../utils/sendEmail.js';

import { db } from "../lib/db.js";

export const login = async(req, res, next) => {
    let user = req.body

    try{
        const User = await db.user.findUnique({
            where: {
                email: user.email
            }
        })
        if(!User){
            return res.status(403).json('Usuário não encontrado')
        }

        if (await bcrypt.compare(user.password, User.password)){ //validation
            const token = jwt.sign({id: User.id}, process.env.JWT_SECRET); // token creation
            
            const { password, ...validUser} = User // userprops

            if(!validUser.verified){
                let token = await db.token.findUnique({
                    where: {userId : validUser.id}
                })
                if(!token){
                    let expiryDate = new Date(Date.now() + 3600000);
                    const dbToken = await db.token.create({ // create token
                        data: {
                            userId: validUser.id,
                            token: crypto.randomBytes(32).toString('hex'),
                            expiresAt: expiryDate,
                        },
                    });
                    const url = `${process.env.BASE_URL}auth/${validUser.id}/verify/${dbToken.token}`; // create verification url
                    await sendMail(validUser.email, "Verificação de Email", url)
                }
                return res
                    .status(400)
                    .json({'error': 'Um email foi enviando para sua conta, por favor verifique!'})
            }

            const expiryDate = new Date(Date.now() + 3600000);
            return res
            .cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate,
            }) //send token
            .status(200) // send success status
            .json(validUser) //send user information
            //return res.status(200).json({'success': 'Login efetuado com sucesso'})
        }

        return res.status(401).json('Usuário ou senha inválidos') //incorrect validation
    } catch (e) {
        console.log(e) // log the error
        next(e); // server error
    }
}

export const logout = async(req, res) => {
    res.clearCookie('access_token').status(200).json('Logout concluido');
}
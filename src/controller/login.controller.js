import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export const login = async(req, res, next) => {
    let user = req.body
    const User = "USER DATABASE READ"
    
    try{
        if (await bcrypt.compare(user.password, User.password)){ //validation
            const token = jwt.sign({id: User.id}, process.env.JWT_SECRET); // token creation
            
            const { password: password, ...validUser} = User // userprops

            return res
            .cookie('access_token', token, {httponly:true, expires: newDate(Date.now() + 3600000)}) //send token
            .status(200) // send success status
            .json(validUser) //send user information
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
import jwt from 'jsonwebtoken';

//generic user validation
export const verifyToken = (req, res, next) =>{
    const token = req.cookies.access_token;

    if(!token) return res.status(401).json( 'Acesso Negado' );

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err){ 
            res.clearCookie("access_token")
            return res.status(403).json("Token não está valido"); 
        }
        next();
    })
}
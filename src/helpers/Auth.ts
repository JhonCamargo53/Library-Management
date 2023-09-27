import jwt from 'jsonwebtoken'
import { IUser } from '../interface'

export const generateToken = (user: string) => {
    return jwt.sign({user}, process.env.JWTKEY || 'NOT TOKEN USED', { expiresIn: '60m' } )
}

export const tokenDecode = (token: string) => {
    const validatedToken = jwt.verify(token, process.env.JWTKEY || 'NOT TOKEN USED') as any
    return  JSON.parse(validatedToken.user) as IUser;
    
}
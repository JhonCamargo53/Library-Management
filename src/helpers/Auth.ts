import jwt from 'jsonwebtoken'

export const generateToken = (user: string) => {
    return jwt.sign({user}, process.env.JWTKEY || 'NOT TOKEN USED', { expiresIn: '30m' } )
}
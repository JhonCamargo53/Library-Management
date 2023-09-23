import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    try {

        const token = req.headers.authorization?.replace("Bearer", "").trim()

        if (!token) return res.status(401).send('Se requiere un token de acceso')

        jwt.verify(token, process.env.JWTKEY || 'NOT TOKEN USED', (error, _decode) => {
            if (error) return res.status(401).send('Token no valido')
            return next()
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send('Error al validar credenciales')
    }

}

export const verifyAdminToken = (req: Request, res: Response, next: NextFunction) => {

    try {

        const token = req.headers.authorization?.replace("Bearer", "").trim()

        if (!token) return res.status(401).send('Se requiere un token de acceso')

        const validatedToken = jwt.verify(token, process.env.JWTKEY || 'NOT TOKEN USED') as any

        const { user } = validatedToken

        if (user.role !== 1) return res.status(401).send('Token no valido - No cuentas con los permisos necesarios')

        return next()

    } catch (error) {
        console.log(error)
        return res.status(40).send('Error al validar credenciales' + error)
    }

}
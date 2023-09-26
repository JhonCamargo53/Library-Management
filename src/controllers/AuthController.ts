import { Request, Response } from "express"
import { loginUserService, registerUserService } from "../service/AuthService"
import { addUserService, getUserValuesByUIDService } from "../service/UserService";
import { generateToken } from "../helpers/Auth";

export const loginUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        const userResult = await loginUserService(email, password);
        const user = await getUserValuesByUIDService(userResult?.uid as string);

        const token = generateToken(JSON.stringify(user));

        res.status(201).json({ message: 'Inicio de sesión exitoso', user, token });

    } catch (error) {
        console.log(error);
        res.status(400).send('Error al iniciar sesión' + error);
    }

}

export const registerUser = async (req: Request, res: Response) => {


    const { user } = req.body;
    const { firstName, lastName, email, password } = user;
    console.log(firstName, lastName, email, password);

    try {

        if (firstName && lastName && email && password) {

            const user = await registerUserService(email, password);

            await addUserService(user?.uid as string, {
                role: 2,
                firstName: firstName,
                lastName: lastName,
                email: email
            });

            res.status(201).json({ message: 'Inicio de sesión exitoso', user });

        } else {
            res.status(500).send("Completa toda la información del usuario para completar el registro.");
        }

    } catch (error) {
        console.log(error);
        res.status(400).send('Error al registrar usuario' + error);
    }

}


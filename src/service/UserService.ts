import database from "../firebase";
import { IUser } from "../interface";

export const addUserService = async (userId: string, user: IUser) => {
    try {

        await database.collection('users').doc(userId).set(user);

    } catch (error) {
        throw error;
    }
}

export const getUserByUID = async (user: IUser) => {
    try {

        await database.collection('users').add(user);

    } catch (error) {
        throw error;
    }
}


export const getUserValuesByUIDService = async (userId: string) => {
    try {
        const userDoc = database.collection('users').doc(userId);
        const user = await userDoc.get();

        if (user.exists) {
            const data = user.data();
            return {id:userId,...data};
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

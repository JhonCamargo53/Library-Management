import firebase from "firebase";

export const registerUserService = async (email: string, password: string) => {
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const loginUserService = async (email: string, password: string) => {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

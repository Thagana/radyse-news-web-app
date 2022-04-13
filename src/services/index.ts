import axios from 'axios';
import { config } from '../config/config';

const checkUser = async () => {
    const token = localStorage.getItem('token') || '';

    if (!token) {
        return false;
    }
    
    const check = await checkToken(token);

    if (!check) {
        return false;
    }

    return true;
}

const checkToken = async (token: string) => {
    return new Promise((resolve, reject) => {
        axios.post(`${config.SERVER_URL}/user/verify-token`, {
            token,
        }).then(() => {
            resolve(true);
        }).catch((error) => {
            console.log(error);
            reject(false);
        })
    })
}

export default { checkUser, checkToken };
import Axios from './configs';
import { config } from '../config/config';
import Article from '../interface/Article.interface';

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
        Axios.post(`${config.SERVER_URL}/auth/verify-token`, {
            token,
        }).then(() => {
            resolve(true);
        }).catch((error) => {
            console.log(error);
            reject(false);
        })
    })
}

const signIn = async (email: string) => {
    return new Promise((resolve, reject) => {
        Axios.post(`${config.SERVER_URL}/auth/register`, {
            email
        }).then((response) => {
            const data = response.data as {
                success: boolean,
                message: string
            }
            resolve(data);
        }).catch((error) => {
            reject(error);
        })
    })
}

const verifyCode = (code: string) => {
    return new Promise((resolve, reject) => {
        Axios.post(`${config.SERVER_URL}/auth/login`, {
            code
        }).then((response) => {
            const data = response.data as {
                success: boolean,
                token: string
            }
            resolve(data);
        }).catch((error) => {
            reject(error);
        })
    })
}


const fetchNews = (page = 1, size = 10) => {
    return new Promise((resolve, reject) => {
        Axios.get(`${config.SERVER_URL}/news/headlines?page=${page}&size=${size}`).then((response) => {
            const responseData = response.data as {
                data: {
                    data: Article[]
                },
                success: boolean
            };
            resolve({ success: responseData.success, data: responseData.data.data });
        }).catch((error) => {
            reject(error);
        })
    })
}


const network  = { checkUser, checkToken, signIn, verifyCode, fetchNews };

export default network;
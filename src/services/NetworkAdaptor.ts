import Axios from "./configs";
import { config } from "../config/config";

const checkUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    await Axios.post(`${config.SERVER_URL}/auth/verify-token`, {
      token,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const signIn = async (email: string, password: string) => {
  try {
    const response = await Axios.post(`${config.SERVER_URL}/auth/login`, {
      email,
      password,
    });

    const data = response.data as {
      success: boolean;
      data: any;
      message: string;
    };

    return data;
  } catch (error) {
    throw error;
  }
};

const verifyCode = async (code: string) => {
  try {
    const response = await Axios.post(`${config.SERVER_URL}/auth/login`, {
      code,
    });

    const data = response.data as {
      success: boolean;
      token: string;
    };

    return data;
  } catch (error) {
    throw error;
  }
};

const fetchNews = async (page = 1, size = 10) => {
  try {
    const response = await Axios.get(
      `${config.SERVER_URL}/news/headlines?page=${page}&size=${size}`
    );

    const responseData = response.data as {
      data: any[];
      success: boolean;
    };

    return {
      success: responseData.success,
      data: responseData.data,
    };
  } catch (error) {
    throw error;
  }
};

const fetchSettings = async () => {
  try {
    const response = await Axios.get(`${config.SERVER_URL}/user/settings`);

    const responseData = response.data as {
      data: {
        data: { location: string; language: string; pushState: string };
      };
      success: boolean;
    };

    return responseData;
  } catch (error) {
    throw error;
  }
};

const updateSettings = async (type: string, values: any) => {
  try {
    const response = await Axios.post(
      `${config.SERVER_URL}/user/update_settings`,
      {
        type,
        state: values.state,
        firstName: values.firstName,
        lastName: values.lastName,
      }
    );

    const responseData = response.data as {
      success: boolean;
      message: string;
    };

    return responseData;
  } catch (error) {
    throw error;
  }
};

const fetchSubs = async () => {
  try {
    const response = await Axios.get(`${config.SERVER_URL}/subscriptions/user`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const createTransaction = async (name: string) => {
  try {
    const response = await Axios.post(
      `${config.SERVER_URL}/subscriptions/transaction/create`,
      {
        name,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

const verifyTransaction = async (reference: string) => {
  try {
    const response = await Axios.post(
      `${config.SERVER_URL}/subscriptions/transaction/verify`,
      {
        reference,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

const disableSubscription = async (code: string, token: string) => {
  try {
    const response = await Axios.post(
      `${config.SERVER_URL}/subscriptions/disable`,
      {
        code,
        token,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

const enableSubscription = async (code: string, token: string) => {
  try {
    const response = await Axios.post(
      `${config.SERVER_URL}/subscriptions/enable`,
      {
        code,
        token,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  checkUser,
  signIn,
  verifyCode,
  fetchNews,
  fetchSettings,
  updateSettings,
  fetchSubs,
  createTransaction,
  verifyTransaction,
  disableSubscription,
  enableSubscription,
};

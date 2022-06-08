import Axios from "./configs";
import { config } from "../config/config";
import Article from "../interface/Article.interface";
import { Subscription } from "../interface/Subscription.interface";
import { Transaction } from '../interface/Transaction.interface';
import { Verify } from "../interface/Verify.interface";

const checkUser = async () => {
  const token = localStorage.getItem("token") || "";

  if (!token) {
    return false;
  }

  const check = await checkToken(token);

  if (!check) {
    return false;
  }

  return true;
};

const checkToken = async (token: string) => {
  return new Promise((resolve, reject) => {
    Axios.post(`${config.SERVER_URL}/auth/verify-token`, {
      token,
    })
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        reject(false);
      });
  });
};

const signIn = async (email: string) => {
  return new Promise((resolve, reject) => {
    Axios.post(`${config.SERVER_URL}/auth/register`, {
      email,
    })
      .then((response) => {
        const data = response.data as {
          success: boolean;
          message: string;
        };
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const verifyCode = (code: string) => {
  return new Promise((resolve, reject) => {
    Axios.post(`${config.SERVER_URL}/auth/login`, {
      code,
    })
      .then((response) => {
        const data = response.data as {
          success: boolean;
          token: string;
        };
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const fetchNews = (page = 1, size = 10) => {
  return new Promise((resolve, reject) => {
    Axios.get(`${config.SERVER_URL}/news/headlines?page=${page}&size=${size}`)
      .then((response) => {
        const responseData = response.data as {
          data: {
            data: Article[];
          };
          success: boolean;
        };
        resolve({
          success: responseData.success,
          data: responseData.data.data,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const fetchSettings = () => {
  return new Promise((resolve, reject) => {
    Axios.get(`${config.SERVER_URL}/user/settings`)
      .then((response) => {
        const responseData = response.data as {
          data: {
            data: { location: string; language: string; pushState: string };
          };
          success: boolean;
        };
        resolve(responseData);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const updateSettings = (type: string, values: any) => {
  return new Promise((resolve, reject) => {
    Axios.post(`${config.SERVER_URL}/user/update_settings`, {
      type,
      state: values.state,
      firstName: values.firstName,
      lastName: values.lastName,
    })
      .then((response) => {
        const responseData = response.data as {
          success: boolean;
          message: string;
        };
        resolve(responseData);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const fetchSubs = () => {
  return new Promise<Subscription>((resolve, reject) => {
    Axios.get(`${config.SERVER_URL}/subscriptions/user`)
      .then((response) => {
        const responseData = response.data;
        resolve(responseData);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const createTransaction = (name: string) => {
  return new Promise<Transaction>((resolve, reject) => {
    Axios.post(`${config.SERVER_URL}/subscriptions/transaction/create`, {
      name
    }).then((response) => {
      const responseData = response.data;
      resolve(responseData);
    }).catch((error) => {
      reject(error);
    })
  })
}

const verifyTransaction = (reference: string) => {
  return new Promise<Verify>((resolve, reject) => {
    Axios.post(`${config.SERVER_URL}/subscriptions/transaction/verify`, {
      reference,
    }).then((response) => {
      const responseData = response.data;
      resolve(responseData);
    }).catch((error) => {
      reject(error);
    })
  })
}

const disableSubscription = (code: string, token: string) => {
  return new Promise<{ success: boolean, message: string }>((resolve, reject) => {
    Axios.post(`${config.SERVER_URL}/subscriptions/disable`, {
      code,
      token
    }).then((response) => {
      const data = response.data;
      resolve(data);
    }).catch((error) => reject(error))
  })
}

const enableSubscription = (code: string, token: string) => {
  return new Promise<{ success: boolean, message: string }>((resolve, reject) => {
    Axios.post(`${config.SERVER_URL}/subscriptions/enable`, {
      code,
      token
    }).then((response) => {
      const data = response.data;
      resolve(data);
    }).catch((error) => reject(error))
  })
}

const network = {
  checkUser,
  checkToken,
  signIn,
  verifyCode,
  fetchNews,
  fetchSettings,
  updateSettings,
  fetchSubs,
  createTransaction,
  verifyTransaction,
  disableSubscription,
  enableSubscription
};

export default network;

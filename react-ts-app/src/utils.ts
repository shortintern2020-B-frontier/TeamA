// access_token: 名前を統一

export const asyncLocalStorage = {
  setItem: async (key: string, value: string) => {
    return Promise.resolve().then(() => {
      localStorage.setItem(key, value);
    });
  },
  getItem: async (key: string) => {
    return Promise.resolve().then(() => {
      const token = localStorage.getItem(key);
      if (!token) {
        return '0'
      }
      return token
    });
  },
  removeItem: async (key: string) => {
    return Promise.resolve().then(() => {
      localStorage.removeItem(key);
    });
  }
};

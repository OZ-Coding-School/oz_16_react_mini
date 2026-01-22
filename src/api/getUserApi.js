/** @format */

const KEY = "userInfo";

export const setUserInfo = (userInfo) => {
  localStorage.setItem(KEY, JSON.stringify(userInfo));
};

export const removeUserInfo = () => {
  localStorage.removeItem(KEY);
};

export const getUserInfo = async () => {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(KEY);
    return null;
  }
};

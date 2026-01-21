/** @format */

const KEY = "userInfo";

export const saveUserInfo = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user));
};

export const loadUserInfo = () => {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    localStorage.removeItem(KEY);
    return null;
  }
};

export const clearUserInfo = () => {
  localStorage.removeItem(KEY);
};
